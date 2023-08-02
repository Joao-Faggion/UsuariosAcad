import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheUsuarioComponent } from './detalhe-usuario.component';

describe('DetalheUsuarioComponent', () => {
  let component: DetalheUsuarioComponent;
  let fixture: ComponentFixture<DetalheUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalheUsuarioComponent]
    });
    fixture = TestBed.createComponent(DetalheUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
