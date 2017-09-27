import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopBrandComponent } from './top-brand/top-brand.component';
import { PostComponent } from './posts/post.component';
import { PostBySlugComponent } from './posts/post-by-slug.component';
import { RootComponent } from './root/root.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopBrandComponent,
    PostComponent,
    PostBySlugComponent,
    RootComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    Http
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
