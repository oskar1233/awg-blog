import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FacebookService } from 'ngx-facebook';

import { AppComponent } from './app.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopBrandComponent } from './top-brand/top-brand.component';
import { RootComponent } from './root/root.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

describe('AppComponent', () => {
  let FacebookServiceMock = {
    init: function() { }
  }
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    spyOn(FacebookServiceMock, 'init');

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
      ],
      providers: [
        { provide: FacebookService, useValue: FacebookServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  })

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'oskar1233'`, async(() => {
    expect(component.title).toEqual('oskar1233');
  }));

  it('should init facebook sdk', () => {
    expect(FacebookServiceMock.init).toHaveBeenCalled();
  })

});
