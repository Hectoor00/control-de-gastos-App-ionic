import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaIngresoPage } from './lista-ingreso.page';

describe('ListaIngresoPage', () => {
  let component: ListaIngresoPage;
  let fixture: ComponentFixture<ListaIngresoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaIngresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
