import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChessPieceComponent } from "../chess-piece/chess-piece.component";

@Component({
  selector: 'app-chess-board',
  standalone:true,
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
  imports: [CommonModule, ChessPieceComponent]
})
export class ChessBoardComponent {
  rows = Array(8).fill(0);
  cols = Array(8).fill(0);
  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  ngOnInit(){
    let canvas= document.getElementById("canvas")! as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")!;
    for ( let i= 0; i < 8; i += 2) {
      for (let j = 0; j < 8; j++) {
        if (j % 2 == 0) {
          ctx.fillStyle = "#373855";
          ctx.fillRect(i * 75, j * 75, 75, 75);
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect((i + 1) * 75, j * 75, 75, 75);
        } else {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(i * 75, j * 75, 75, 75);
          ctx.fillStyle = "#373855";
          ctx.fillRect((i + 1) * 75, j * 75, 75, 75);
        }
    }
  }
}
}
