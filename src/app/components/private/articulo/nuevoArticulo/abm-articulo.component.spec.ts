import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmArticuloComponent } from './abm-articulo.component';

describe('AbmArticuloComponent', () => {
  let component: AbmArticuloComponent;
  let fixture: ComponentFixture<AbmArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
