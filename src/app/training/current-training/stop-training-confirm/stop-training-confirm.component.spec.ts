import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopTrainingConfirmComponent } from './stop-training-confirm.component';

describe('StopTrainingConfirmComponent', () => {
  let component: StopTrainingConfirmComponent;
  let fixture: ComponentFixture<StopTrainingConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopTrainingConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopTrainingConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
