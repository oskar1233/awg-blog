import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostComponent } from './post.component';
import { PostBySlugComponent } from './post-by-slug.component';

@NgModule({
  declarations: [
    PostComponent,
    PostBySlugComponent,
  ],
  exports: [
    PostBySlugComponent
  ]
})
export class PostsModule { }