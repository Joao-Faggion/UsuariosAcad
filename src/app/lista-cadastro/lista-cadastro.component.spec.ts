import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCadastroComponent } from './lista-cadastro.component';

describe('ListaCadastroComponent', () => {
  let component: ListaCadastroComponent;
  let fixture: ComponentFixture<ListaCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCadastroComponent]
    });
    fixture = TestBed.createComponent(ListaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
