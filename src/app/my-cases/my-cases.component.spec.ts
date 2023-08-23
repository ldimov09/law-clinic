import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCasesComponent } from './my-cases.component';

describe('MyCasesComponent', () => {
  let component: MyCasesComponent;
  let fixture: ComponentFixture<MyCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
