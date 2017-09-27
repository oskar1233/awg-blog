import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopBrandComponent } from './top-brand/top-brand.component';
import { RootComponent } from './root/root.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostComponent } from './posts/post.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        SidebarComponent,
        RootComponent,
        TopBrandComponent,
        PageNotFoundComponent,
        PostComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'oskar1233'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('oskar1233');
  }));

});
