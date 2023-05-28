import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GastosingresosPage } from './gastosingresos.page';

describe('GastosingresosPage', () => {
  let component: GastosingresosPage;
  let fixture: ComponentFixture<GastosingresosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GastosingresosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
