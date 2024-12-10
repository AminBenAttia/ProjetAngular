import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessPieceType } from 'src/types/types';

@Component({
  selector: '[app-chess-piece]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chess-piece.component.html',
  styleUrls: ['./chess-piece.component.css']
})
export class ChessPieceComponent {
@Input() pieceType!:ChessPieceType
InitPiece(ctx:CanvasRenderingContext2D,x:number,y:number,size:number=75){
  const piece = new Image()
  piece.src=`../../../assets/${this.pieceType}.png`
  piece.onload=()=>{
  ctx.drawImage(piece,x,y,size,size)
  }
}
}
