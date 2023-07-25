import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCaseFormComponent } from './submit-case-form.component';

describe('SubmitCaseFormComponent', () => {
  let component: SubmitCaseFormComponent;
  let fixture: ComponentFixture<SubmitCaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitCaseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitCaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
