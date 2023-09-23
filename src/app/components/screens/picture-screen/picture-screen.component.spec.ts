import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureScreenComponent } from './picture-screen.component';

describe('PictureScreenComponent', () => {
  let component: PictureScreenComponent;
  let fixture: ComponentFixture<PictureScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
