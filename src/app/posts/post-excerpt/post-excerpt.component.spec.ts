import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PostExcerptComponent } from './post-excerpt.component';
import { Post } from '../post/post';

describe('PostExcerptComponent', () => {
  let component: PostExcerptComponent;
  let fixture: ComponentFixture<PostExcerptComponent>;
  let componentElem: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostExcerptComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostExcerptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    componentElem = fixture.debugElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('for valid post provided', () => {
    beforeEach(() => {
      component.post = new Post({
        id: 1,
        title: 'Some title',
        excerpt: 'Some excerpt',
        content: 'Content',
        slug: 'some-title'
      })

      fixture.detectChanges();
    })

    it('renders title', () => {
      expect(componentElem.nativeElement.textContent).toContain(component.post.title);
    })

    it('renders excerpt', () => {
      expect(componentElem.nativeElement.textContent).toContain(component.post.excerpt);
    })

    it('renders permalink', () => {
      let slug = component.post.slug;
      let permalink = componentElem.query(By.css('a'));
      expect(permalink).toBeDefined();

      expect(permalink.nativeElement.getAttribute('href')).toBe('/post/' + slug);
    })

    it("doesn\'t render content", () => {
      expect(componentElem.nativeElement.textContent).not.toContain(component.post.content);
    })
  })

  describe('for no post given', () => {
    it('renders error message', () => {
      expect(componentElem.nativeElement.textContent.toLowerCase()).toContain('error loading post');
    })
  })
});