import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSpecialtyComponent } from './dialog-specialty.component';

describe('DialogSpecialtyComponent', () => {
  let component: DialogSpecialtyComponent;
  let fixture: ComponentFixture<DialogSpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSpecialtyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
