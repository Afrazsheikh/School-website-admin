import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudCornerComponent } from './stud-corner.component';

describe('StudCornerComponent', () => {
  let component: StudCornerComponent;
  let fixture: ComponentFixture<StudCornerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudCornerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
