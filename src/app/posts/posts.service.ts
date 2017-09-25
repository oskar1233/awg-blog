import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { Post } from './post';

@Injectable()
export class PostsService {

  private url = 'https://klebek-uczuc.pl/wp-json/wp/v2/';

  constructor(
    private http: Http
  ) { }

  postFromJson(postJson) {
    if(postJson['id'] === undefined) return null;

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
      this.http.get(this.url + 'posts=' + slug).subscribe(
        (response) => {
          let postJson = response.json()[0];

          subscriber.next(this.postFromJson(postJson));
        }
      )
    })
  }

  index(): Observable<Array<Post>> {
    return new Observable((subscriber) => {
      this.http.get(this.url + 'posts').subscribe(
        (response) => {
          let postsJson = response.json();

          let posts = new Array<Post>();
          for(let postJson of postsJson) {
            posts.push(this.postFromJson(postJson));
          }

          subscriber.next(posts);
        }
      )
    })
  }

}
