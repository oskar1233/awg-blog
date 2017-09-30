import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../post/post';

@Component({
  selector: 'app-newest-posts',
  templateUrl: './newest-posts.component.html',
  styleUrls: ['./newest-posts.component.scss']
})
export class NewestPostsComponent implements OnInit {
  private posts: Post[];
  private page: number;

  constructor(
    private route: ActivatedRoute,
    private service: PostsService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.page = +params.page || 1;

        this.loadPosts();
      });
  }

  private loadPosts() {
    this.service.index(this.page).subscribe((obj) => {
      this.posts = obj.posts;
    })
  }

}
