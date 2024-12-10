import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewSitioModalPage } from './new-sitio-modal.page';

describe('NewSitioModalPage', () => {
  let component: NewSitioModalPage;
  let fixture: ComponentFixture<NewSitioModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSitioModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
