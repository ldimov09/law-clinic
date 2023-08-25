import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCasesSpecComponent } from './chart-cases-spec.component';

describe('ChartCasesSpecComponent', () => {
  let component: ChartCasesSpecComponent;
  let fixture: ComponentFixture<ChartCasesSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCasesSpecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartCasesSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
