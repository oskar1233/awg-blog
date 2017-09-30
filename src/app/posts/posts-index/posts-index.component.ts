import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Post } from '../post/post';

@Component({
  selector: 'app-posts-index',
  templateUrl: './posts-index.component.html',
  styleUrls: ['./posts-index.component.scss']
})
export class PostsIndexComponent implements OnInit, OnChanges {
  @Input() posts: Post[];
  private loadingFailed: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.posts.firstChange && changes.posts.currentValue == null) {
      this.loadingFailed = true;
    } else {
      this.loadingFailed = false;
    }
  }

}
