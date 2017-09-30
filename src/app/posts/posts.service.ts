import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';

import { Post } from './post/post';

@Injectable()
export class PostsService {

  private url = 'http://wp.oskar1233.eu/wp-json/wp/v2/';

  constructor(
    private http: Http
  ) { }

  postFromJson(postJson) {
    if (postJson === undefined || postJson['id'] === undefined) {
      return null;
    }

    return new Post({
      id: postJson['id'],
      slug: postJson['slug'] || null,
      date: postJson['date'] || null,
      title: postJson['title']['rendered'] || null,
      content: postJson['content']['rendered'] || null,
      excerpt: postJson['excerpt']['rendered'] || null,
    })
  }

  get(id: number): Observable<Post> {
    if(!Number.isInteger(id)) return null;

    return new Observable((subscriber) => {
      this.http.get(this.url + 'posts/' + id.toString()).subscribe(
        (response) => {
          let postJson = response.json();

          subscriber.next(this.postFromJson(postJson));
        }
      )
    })
  }

  getBySlug(slug: string): Observable<Post> {
    return new Observable((subscriber) => {
      this.http.get(this.url + 'posts?slug=' + slug).subscribe(
        (response) => {
          let postJson = response.json()[0];

          subscriber.next(this.postFromJson(postJson));
        }
      )
    })
  }

  index(page: number = 1): Observable<{
    meta: {
      totalPages: number
    },
    posts: Array<Post>
  }> {

    return new Observable((subscriber) => {
      let totalPages: number;

      this.http.get(this.url + 'posts', {params: {page: page}}).subscribe(
        (response) => {
          let postsJson = response.json();

          totalPages = +response.headers.get('X-WP-TotalPages');

          let posts = new Array<Post>();
          for(let postJson of postsJson) {
            posts.push(this.postFromJson(postJson));
          }

          subscriber.next({
            meta: {
              totalPages: totalPages
            },
            posts: posts
          });
        }
      )

    })

  }

}
