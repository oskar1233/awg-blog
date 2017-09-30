import { DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { PostExcerptComponent } from '../post-excerpt/post-excerpt.component';
import { PostsIndexComponent } from './posts-index.component';

import { Post } from '../post/post';

describe('PostsIndexComponent', () => {
  let componentElem: DebugElement;
  let component: PostsIndexComponent;
  let fixture: ComponentFixture<PostsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule
      ],
      declarations: [
        PostExcerptComponent,
        PostsIndexComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsIndexComponent);
    component = fixture.componentInstance;
    componentElem = fixture.debugElement;

    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('renders link back to home page', () => {
    let linkBack = componentElem.query(By.css('#back-home'));

    expect(linkBack).toBeDefined();

    fixture.whenStable().then(() => {
      expect(linkBack.nativeElement.getAttribute('href')).toBe('/');
    });
  })

  describe('when valid posts given', () => {
    beforeEach(() => {
      component.posts = [
        new Post({
          id: 1,
          title: "Some title",
          slug: "some-title",
          excerpt: "Some excerpt",
          content: "<p>Hey!</p>"
        }),
        new Post({
          id: 2,
          title: "Sec title",
          slug: "sec-title",
          excerpt: "Some excerpt",
          content: "<p>Hey 2!</p>"
        }),
      ];

      fixture.detectChanges();
    })
    
    it('renders all posts', () => {
      expect(component.posts.length).toBeGreaterThan(1);
      for (let post of component.posts) {
        expect(componentElem.nativeElement.textContent).toContain(post.title)
      }
    })
  })

  describe('when no posts given', () => {
    it('renders loading message', () => {
      let content: string = componentElem.nativeElement.textContent;
      expect(content.toLowerCase()).toContain('loading content');
    })
  })

  describe('when invalid posts', () => {
    beforeEach(() => {
      component.ngOnChanges({
        posts: new SimpleChange(component.posts, null, false)
      });
      component.posts = null;
      fixture.detectChanges();

      componentElem = fixture.debugElement;
    })

    it('renders error message', () => {
      let content: string = componentElem.nativeElement.textContent;
      expect(content.toLowerCase()).toContain('error loading posts');
    })
  })
});
