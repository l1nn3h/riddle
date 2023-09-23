import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionInputComponent } from './solution-input.component';

describe('SolutionInputComponent', () => {
  let component: SolutionInputComponent;
  let fixture: ComponentFixture<SolutionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
