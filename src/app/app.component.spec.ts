import { DebugElement } from '@angular/core';
import { TestBed, async, fakeAsync, ComponentFixture, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { FacebookService } from 'ngx-facebook';

import { AppComponent } from './app.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopBrandComponent } from './top-brand/top-brand.component';
import { RootComponent } from './root/root.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

describe('AppComponent', () => {
  let FacebookServiceMock = {
    init: function () { }
  }
  let component: AppComponent;
  let componentElem: DebugElement;
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
    componentElem = fixture.debugElement;
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

  describe('#scroll', () => {
    let scrollEvent: any = {target: {scrollTop: 40}}
    
    it('is called on .main scroll', fakeAsync(() => {
      fixture.detectChanges();
      spyOn(component, 'scroll');

      let mainElement = componentElem.query(By.css('.main'));
      mainElement.triggerEventHandler('scroll', scrollEvent);
      tick();

      fixture.detectChanges();
      expect(component.scroll).toHaveBeenCalled();
    }))

    it('sets scrolled to true if scrollY > 0', () => {
      component.scrolled = false;

      let mainElement = componentElem.query(By.css('.main'));
      mainElement.triggerEventHandler('scroll', scrollEvent);

      expect(component.scrolled).toBeTruthy();
    })

    it('sets scrolled to false if scrollY = 0', () => {
      scrollEvent.target.scrollTop = 0;
      component.scrolled = true;

      let mainElement = componentElem.query(By.css('.main'));
      mainElement.triggerEventHandler('scroll', scrollEvent);

      expect(component.scrolled).toBeFalsy();
    })
  })

});
