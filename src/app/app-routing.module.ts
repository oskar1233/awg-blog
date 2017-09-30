import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostBySlugComponent } from './posts/post-by-slug/post-by-slug.component';
import { NewestPostsComponent } from './posts/newest-posts/newest-posts.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RootComponent } from './root/root.component';

const appRoutes: Routes = [
  { path: '', component: RootComponent },
  { path: 'posts', component: NewestPostsComponent },
  { path: 'post/:slug', component: PostBySlugComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ]
})
export class AppRoutingModule { };