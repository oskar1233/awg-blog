import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../post/post';

@Component({
  selector: 'app-post-excerpt',
  templateUrl: './post-excerpt.component.html',
  styleUrls: ['./post-excerpt.component.scss']
})
export class PostExcerptComponent implements OnInit {
  @Input() post: Post;

  constructor() { }

  ngOnInit() {
  }
  
  getLinkArr(): Array<string> {
    return ['/post', this.post.slug]
  }

}
