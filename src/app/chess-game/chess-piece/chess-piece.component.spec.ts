import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessPieceComponent } from './chess-piece.component';

describe('ChessPieceComponent', () => {
  let component: ChessPieceComponent;
  let fixture: ComponentFixture<ChessPieceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChessPieceComponent]
    });
    fixture = TestBed.createComponent(ChessPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
