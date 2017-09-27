import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModule, XHRBackend, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs';

import { PostMock } from './post-mock';
import { PostComponent } from './post.component';
import { PostsService } from './posts.service';
import { PostBySlugComponent } from './post-by-slug.component';

describe('PostBySlug', () => {
  let componentElem: DebugElement;
  let component: PostBySlugComponent;
  let fixture: ComponentFixture<PostBySlugComponent>;
  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        PostsService,
        { provide: XHRBackend, useClass: MockBackend },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({slug: 'some-title'}),
            paramMap: Observable.of({get: () => 'some-title'})
          }
        }
      ],
      declarations: [
        PostComponent,
        PostBySlugComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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

    componentElem = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render proper post', () => {
    expect(componentElem.nativeElement.textContent).toContain('Some title');
  });
});
