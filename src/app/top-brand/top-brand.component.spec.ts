import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBrandComponent } from './top-brand.component';

describe('TopBrandComponent', () => {
  let component: TopBrandComponent;
  let fixture: ComponentFixture<TopBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
