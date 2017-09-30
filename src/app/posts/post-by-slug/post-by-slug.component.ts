import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Post } from '../post/post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-by-slug',
  template: '<app-post [post]="post"></app-post>'
})
export class PostBySlugComponent implements OnInit {
  public post: Post;

  constructor(
    private service: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => 
      this.service.getBySlug(params.get('slug'))
    ).subscribe((post: Post) => {
      this.post = post;
    })
  }
}