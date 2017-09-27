import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    RouterModule,
    PostsModule,
    AppRoutingModule
  ],
  providers: [
    Http
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
