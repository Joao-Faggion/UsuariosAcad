import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriaCadastroComponent } from './cria-cadastro.component';

describe('CriaCadastroComponent', () => {
  let component: CriaCadastroComponent;
  let fixture: ComponentFixture<CriaCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriaCadastroComponent]
    });
    fixture = TestBed.createComponent(CriaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
