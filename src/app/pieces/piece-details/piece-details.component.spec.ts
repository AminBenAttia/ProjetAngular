import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceDetailsComponent } from './piece-details.component';

describe('PieceDetailsComponent', () => {
  let component: PieceDetailsComponent;
  let fixture: ComponentFixture<PieceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieceDetailsComponent]
    });
    fixture = TestBed.createComponent(PieceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
