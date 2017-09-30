import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModule, XHRBackend, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs';

import { FacebookService } from 'ngx-facebook';

import { PostsModule } from '../posts.module';
import { PostMock } from '../post/post-mock';
import { PostComponent } from '../post/post.component';
import { PostsService } from '../posts.service';
import { PostBySlugComponent } from './post-by-slug.component';

describe('PostBySlug', () => {
  let componentElem: DebugElement;
  let component: PostBySlugComponent;
  let fixture: ComponentFixture<PostBySlugComponent>;
  let mockBackend: MockBackend;
  let postsService: PostsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PostsModule,
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({slug: 'some-title'}),
            paramMap: Observable.of({get: () => 'some-title'})
          }
        },
        { provide: FacebookService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    postsService = TestBed.get(PostsService);
    mockBackend = TestBed.get(XHRBackend);

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({
            body: PostMock.wpGetBySlug1
          })
        ));
    });

    fixture = TestBed.createComponent(PostBySlugComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    componentElem = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render proper post', async(() => {
    expect(componentElem.nativeElement.textContent).toContain('Some title');
  }));

});
