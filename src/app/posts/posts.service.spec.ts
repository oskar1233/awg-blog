import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule, XHRBackend, RequestMethod, Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { PostsService } from './posts.service';
import { Post } from './post/post';
import { PostMock } from './post/post-mock';

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
    it('should return array of posts and metadata', (done) => {
      this.mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);

          connection.mockRespond(new Response(
            new ResponseOptions({
              body: PostMock.wpIndex,
              headers: new Headers({
                "X-WP-TotalPages": "4"
              })
            })
          ));
        }
      )

      this.service.index().subscribe((obj) => {
        let posts = obj.posts;

        expect(posts instanceof Array).toBeTruthy();
        expect(posts.length).toBeGreaterThan(1);

        for (let p of posts) {
          expect(p instanceof Post).toBeTruthy();
        }

        expect(obj.meta.totalPages).toEqual(4);

        done();
      })
    });

    describe('when no page no provided', () => {
      it('should fetch data for page 1', (done) => {

        this.mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            expect(connection.request.url).toContain('page=1');

            connection.mockRespond(new Response(new ResponseOptions({
              body: PostMock.wpIndex,
              headers: new Headers({
                'X-WP-TotalPages': '4'
              })
            })))
          }
        )

        this.service.index().subscribe((resp) => {
          done();
        });

      })
    })

    describe('when page number provided', () => {
      it('should fetch data for specified page', async(() => {
        this.mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            expect(connection.request.url).toContain('page=5');
          }
        )

        this.service.index(5).subscribe();
      }))
    })
  });

  describe('#getBySlug', () => {

    describe('for existing slug', () => {
      it('should return post', (done) => {
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

    describe('for non-existing slug', () => {
      it('should return null', (done) => {
        this.mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            expect(connection.request.method).toBe(RequestMethod.Get);

            connection.mockRespond(new Response(
              new ResponseOptions({
                body: '[]'
              })
            ))
          }
        )

        this.service.getBySlug('invalid').subscribe(
          (post: Post) => {
            expect(post).toBeNull();
            done();
          }
        )
      })
    })

  });

});
