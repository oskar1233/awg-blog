import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule, XHRBackend, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { PostsService } from './posts.service';
import { Post } from './post';
import { PostMock } from './post-mock';

describe('PostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        PostsService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    this.service = TestBed.get(PostsService);
    this.mockBackend = TestBed.get(XHRBackend);
  });

  it('should be created', () => {
    expect(this.service).toBeTruthy();
  });

  describe('#get', () => {

    it('should exist', () => {
      expect(this.service.get).toBeDefined();
    });

    describe('when no parameter provided', () => {
      it('should return null', () => {
        expect(this.service.get()).toBeNull();
      });
    });

    describe('when unknown id provided', () => {
      it('should return null', (done) => {
        this.mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);

            connection.mockRespond(new Response(
              new ResponseOptions({
                body: PostMock.wpGet404
              })
            ));
          }
        )

        this.service.get(959).subscribe((post: Post) => {
          expect(post).toBeNull();
          done();
        });
      });
    });

    describe('when proper id provided', () => {

      it('should return Post with all fields set', (done) => {
        this.mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);

            connection.mockRespond(new Response(
              new ResponseOptions({
                body: PostMock.wpGet1
              })
            ));
          }
        )

        this.service.get(1).subscribe((post: Post) => {
          expect(post instanceof Post).toBeTruthy();

          expect(post.id).toEqual(1);
          expect(post.date).toBeDefined();
          expect(post.slug).toBeDefined();
          expect(post.excerpt).toBeDefined();
          expect(post.content).toBeDefined();
          expect(post.title).toBeDefined();

          done();
        });

      });

    });

  });

  describe('#index', () => {
    it('should return array of all posts', (done) => {
        this.mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);

            connection.mockRespond(new Response(
              new ResponseOptions({
                body: PostMock.wpIndex
              })
            ));
          }
        )

      this.service.index().subscribe((posts: Array<Post>) => {
        expect(posts instanceof Array).toBeTruthy();
        expect(posts.length).toBeGreaterThan(1);

        for(let p of posts) {
          expect(p instanceof Post).toBeTruthy();
        }
        
        done();
      })
    });
  });

  describe('#getBySlug', () => {
    it('should return post of specified slug', (done) => {
      this.mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);

          connection.mockRespond(new Response(
            new ResponseOptions({
              body: PostMock.wpGetBySlug1
            })
          ));
        }
      )

      this.service.getBySlug('some-title').subscribe(
        (post: Post) => {
          expect(post instanceof Post).toBeTruthy();

          expect(post.slug).toBe('some-title');

          done();
        }
      )
    });
  });

});
