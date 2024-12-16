import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessBoardComponent } from "./chess-board/chess-board.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-chess-game',
  standalone: true,
  imports: [CommonModule, ChessBoardComponent, NavbarComponent],
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent {
turn:"b"|"w"="b"
gameOver:boolean=false
changeTurn(turn:"b"|"w"){
this.turn=turn
}
changeGameOver(go:boolean){
this.gameOver=go
}
}
