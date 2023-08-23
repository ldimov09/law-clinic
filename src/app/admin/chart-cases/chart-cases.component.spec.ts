import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCasesComponent } from './chart-cases.component';

describe('ChartCasesComponent', () => {
  let component: ChartCasesComponent;
  let fixture: ComponentFixture<ChartCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
