import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessPieceType, piecesType } from 'src/types/types';
import { black, size, white } from 'src/utils/color';
import { canBishopMove, canKingMove, canknightMove, canPawnMove, canQueenMove, canRookMove } from 'src/utils/movePieces';

@Component({
  selector: '[app-chess-piece]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chess-piece.component.html',
  styleUrls: ['./chess-piece.component.css']
})
export class ChessPieceComponent {
  pieceType!: ChessPieceType
  x: number = 0
  y: number = 0
  pieceImage = new Image()
  color: "b" | "w" | undefined
  setPosition(x: number, y: number) {
    this.x = x
    this.y = y
  }
  InitPiece(ctx: CanvasRenderingContext2D, x: number, y: number, pieceType: ChessPieceType, color: "b" | "w", size: number = 60) {
    this.pieceType = pieceType
    this.color = color
    this.setPosition(y / size, x / size)
    this.pieceImage.src = `../../../assets/${(color == "b" ? "black" : "white") + "-" + this.pieceType}.png`
    this.pieceImage.onload = () => {
      ctx.drawImage(this.pieceImage, x, y, size, size)
    }
  }
  checkIsInBlock(x: number, y: number) {
    return this.x == x && this.y == y
  }
  moveTo(ctx: CanvasRenderingContext2D, mx: number, my: number,kill:Boolean=false) {
    if (Math.abs(this.x - this.y) % 2 != 0) {
      ctx.fillStyle = white;
      ctx.fillRect(this.y * size, this.x * size, size, size);
    } else {
      ctx.fillStyle = black;
      ctx.fillRect(this.y * size, this.x * size, size, size);
    }
    this.x = mx
    this.y = my
    if (Math.abs(this.x - this.y) % 2 != 0) {
      ctx.fillStyle = white;
      ctx.fillRect(this.y * size, this.x * size, size, size);
    } else {
      ctx.fillStyle = black;
      ctx.fillRect(this.y * size, this.x * size, size, size);
    }
    ctx.drawImage(this.pieceImage, this.y * size, this.x * size, size, size)
  }
  canMove(pieces: piecesType, turn: "b" | "w") {
    let res: {
      greenBlocks: {
        x: number;
        y: number;
      }[];
      canKill: {
        x: number;
        y: number;
      }[];
    } = {canKill:[],greenBlocks:[]}
    switch (this.pieceType) {
      case 'pawn':
        res = canPawnMove(pieces, this.x, this.y, turn)
        break
      case "rook":
        res = canRookMove(pieces,this.x,this.y,turn)
        break
      case "bishop":
        res=canBishopMove(pieces,this.x,this.y,turn)
        break
      case "queen":
        res=canQueenMove(pieces,this.x,this.y,turn)
        break
      case "king":
        res=canKingMove(pieces,this.x,this.y,turn)
        break
      case "hourse":
        res=canknightMove(pieces,this.x,this.y,turn)
        break
    }
    return res
  }
  colorUnder(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(this.y * size, this.x * size, size, size);
    ctx.drawImage(this.pieceImage, this.y * size, this.x * size, size, size)
  }
}
