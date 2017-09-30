import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { XHRBackend, HttpModule, Http, Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/observable/of';

import { PostsModule } from '../posts.module';
import { PostsService } from '../posts.service';
import { PostMock } from '../post/post-mock';
import { Post } from '../post/post';

import { NewestPostsComponent } from './newest-posts.component';

describe('NewestPostsComponent', () => {
  let component: NewestPostsComponent;
  let componentElem: DebugElement;
  let fixture: ComponentFixture<NewestPostsComponent>;
  let mockBackend: MockBackend;

  let activatedRouteMock = {queryParams: Observable.of({}), snapshot: {}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule,
        PostsModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: XHRBackend, useClass: MockBackend },
        PostsService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestPostsComponent);
    mockBackend = TestBed.get(XHRBackend);
    component = fixture.componentInstance;
    componentElem = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when no page query param provided', () => {
    it('queries first page', (done) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.url).toContain('page=1');
        done();
      })

      component.ngOnInit();
    })
  })

  describe('when page number provided in query param', () => {
    beforeAll(() => {
      activatedRouteMock.queryParams = Observable.of({page: 3});
    })

    it('queries for provided page', (done) => {

      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.url).toContain('page=3');
        done();
      })

      component.ngOnInit();
    })
  })

  it('renders fetched posts', (done) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: PostMock.wpIndex,
          headers: new Headers({
            'X-WP-TotalPages': '4'
          })
        })))
      }
    )

    component.ngOnInit();
    fixture.detectChanges();

    let postsJson = JSON.parse(PostMock.wpIndex);
    for(let json of postsJson) {
      let textContent = componentElem.nativeElement.textContent;
      expect(textContent).toContain(json['title']['rendered']);
      expect(textContent).toContain(json['excerpt']['rendered']);
    }

    done();
  });

});
