import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMandComponent } from './public-mand.component';

describe('PublicMandComponent', () => {
  let component: PublicMandComponent;
  let fixture: ComponentFixture<PublicMandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicMandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicMandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
