import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessBoardComponent } from "./chess-board/chess-board.component";

@Component({
  selector: 'app-chess-game',
  standalone: true,
  imports: [CommonModule, ChessBoardComponent],
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent {
turn:"b"|"w"="b"
changeTurn(turn:"b"|"w"){
this.turn=turn
}
}
