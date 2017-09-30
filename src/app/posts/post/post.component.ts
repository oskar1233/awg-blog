import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from './post';

declare var window: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post: Post = null;

  private loadingFailed: boolean = false;
  private parsedXFBML: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.post) {
      if (!changes.post.firstChange && changes.post.currentValue == null) {
        this.loadingFailed = true;
      } else {
        this.loadingFailed = false;
      }
    }
  }

  parseXFBML() {
    if(this.parsedXFBML == false && window.FB !== undefined) {
      this.parsedXFBML = true;
      window.FB.XFBML.parse();
    }
  }

}