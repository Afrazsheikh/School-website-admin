import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbakFormComponent } from './feedbak-form.component';

describe('FeedbakFormComponent', () => {
  let component: FeedbakFormComponent;
  let fixture: ComponentFixture<FeedbakFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbakFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbakFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
