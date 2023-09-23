import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiddleOneComponent } from './riddle-one.component';

describe('RiddleOneComponent', () => {
  let component: RiddleOneComponent;
  let fixture: ComponentFixture<RiddleOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiddleOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiddleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
