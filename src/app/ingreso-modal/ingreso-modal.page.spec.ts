import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresoModalPage } from './ingreso-modal.page';

describe('IngresoModalPage', () => {
  let component: IngresoModalPage;
  let fixture: ComponentFixture<IngresoModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IngresoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
