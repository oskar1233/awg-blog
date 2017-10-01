import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FacebookModule, FacebookService } from 'ngx-facebook';

import { AppRoutingModule } from './app-routing.module';
import { PostsModule } from './posts/posts.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopBrandComponent } from './top-brand/top-brand.component';
import { RootComponent } from './root/root.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopBrandComponent,
    RootComponent,
    PageNotFoundComponent,
  ],
  imports: [
    FacebookModule.forRoot(),

    BrowserModule,
    RouterModule,
    HttpModule,

    AppRoutingModule,

    PostsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
