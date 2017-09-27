import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { Post } from './post';

describe('PostComponent', () => {
  let component: PostComponent;
  let componentElem: DebugElement;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    component.post = new Post({
      title: "Title",
      excerpt: "Some excerpt...",
      content: "<p>That's the content!</p>",
      date: "2016-05-16T16:23:41",
      slug: "title"
    });

    componentElem = fixture.debugElement;
    
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render post\'s title', () => {
    expect(componentElem.nativeElement.textContent).toContain(component.post.title);
  })

  it('should render post\'s content', () => {
    expect(componentElem.nativeElement.textContent).toContain(component.post.content);
  })
});
