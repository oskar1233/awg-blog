import { DebugElement, SimpleChange, SimpleChanges } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FacebookModule, FacebookService } from 'ngx-facebook';

import { PostComponent } from './post.component';
import { Post } from './post';

describe('PostComponent', () => {
  let component: PostComponent;
  let componentElem: DebugElement;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FacebookModule ],
      declarations: [ PostComponent ],
      providers: [ { provide: FacebookService, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    componentElem = fixture.debugElement;

    fixture.detectChanges();
    spyOn(component, "parseXFBML");
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render back link', async(() => {
    let linkBack = componentElem.query(By.css('#back-to-posts'));

    expect(linkBack).toBeDefined();

    fixture.whenStable().then(() => {
      expect(linkBack.nativeElement.getAttribute('href')).toBe('/posts');
    });
  }))

  describe('when post is valid', () => {
    beforeEach(() => {
      component.post = new Post({
        title: "Title",
        excerpt: "Some excerpt...",
        content: "<p>That's the content!</p>",
        date: "2016-05-16T16:23:41",
        slug: "title"
      });

      componentElem = fixture.debugElement;

      fixture.detectChanges();
    })

    it('renders post\'s title', () => {
      expect(componentElem.nativeElement.innerHTML)
        .toContain(component.post.title);
    })

    it('renders post\'s content', () => {
      expect(componentElem.nativeElement.innerHTML)
        .toContain(component.post.content);
    })

    it('renders Facebook comments', () => {
      expect(componentElem.query(By.css('.fb-comments'))).toBeTruthy();
    })

    it('parses XFBML', () => {
      expect(component.parseXFBML).toHaveBeenCalled();
    })
  });

  describe('when post is not provided', () => {
    beforeEach(() => {
      component.post = null;

      componentElem = fixture.debugElement;

      fixture.detectChanges();
    })

    it('renders loading message', () => {
      let content: string = componentElem.nativeElement.textContent;
      expect(content.toLowerCase()).toContain('loading');
    })

    it("doesn't parse XFBML", () => {
      expect(component.parseXFBML).not.toHaveBeenCalled();
    })
  })

  describe('when post is invalid', () => {
    beforeEach(() => {
      component.ngOnChanges({
        post: new SimpleChange(component.post, null, false)
      });
      component.post = null;
      fixture.detectChanges();

      componentElem = fixture.debugElement;
    })

    it('renders not found message', () => {
      let content: string = componentElem.nativeElement.textContent;
      expect(content.toLowerCase()).toContain('not found');
    })

    it("doesn't parse XFBML", () => {
      expect(component.parseXFBML).not.toHaveBeenCalled();
    })
  })
});
