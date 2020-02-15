import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenDetailComponent } from './children-detail.component';

describe('ChildrenDetailComponent', () => {
  let component: ChildrenDetailComponent;
  let fixture: ComponentFixture<ChildrenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
