import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FacebookModule } from 'ngx-facebook';

import { PostsService } from './posts.service';

import { PostComponent } from './post/post.component';
import { PostBySlugComponent } from './post-by-slug/post-by-slug.component';
import { NewestPostsComponent } from './newest-posts/newest-posts.component';
import { PostsIndexComponent } from './posts-index/posts-index.component';
import { PostExcerptComponent } from './post-excerpt/post-excerpt.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FacebookModule
  ],
  declarations: [
    PostComponent,
    PostsIndexComponent,
    PostBySlugComponent,
    NewestPostsComponent,
    PostExcerptComponent,
  ],
  providers: [
    PostsService
  ],
  exports: [
    PostBySlugComponent
  ]
})
export class PostsModule { }