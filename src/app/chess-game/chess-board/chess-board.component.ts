import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ChessPieceComponent } from "../chess-piece/chess-piece.component";
import { piecesType } from 'src/types/types';

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
  size:number=60
  @ViewChild("blackBishop") blackBishop :ChessPieceComponent | undefined;
  @ViewChild("blackKing") blackKing :ChessPieceComponent | undefined;
  @ViewChild("blackHourse") blackHourse :ChessPieceComponent | undefined;
  @ViewChild("blackPawn") blackPawn :ChessPieceComponent | undefined;
  @ViewChild("blackQueen") blackQueen :ChessPieceComponent | undefined;
  @ViewChild("blackRook") blackRook :ChessPieceComponent | undefined;
  @ViewChild("whiteBishop") whiteBishop :ChessPieceComponent | undefined;
  @ViewChild("whiteKing") whiteKing :ChessPieceComponent | undefined;
  @ViewChild("whiteHourse") whiteHourse :ChessPieceComponent | undefined;
  @ViewChild("whitePawn") whitePawn :ChessPieceComponent | undefined;
  @ViewChild("whiteQueen") whiteQueen :ChessPieceComponent | undefined;
  @ViewChild("whiteRook") whiteRook :ChessPieceComponent | undefined;
  pieces:piecesType=[]
  drawBoard(ctx: CanvasRenderingContext2D){
    for ( let i= 0; i < 8; i += 2) {
      for (let j = 0; j < 8; j++) {
        if (j % 2 == 0) {
          ctx.fillStyle = "#373855";
          ctx.fillRect(i * this.size, j * this.size, this.size, this.size);
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect((i + 1) * this.size, j * this.size, this.size, this.size);
        } else {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(i * this.size, j * this.size, this.size, this.size);
          ctx.fillStyle = "#373855";
          ctx.fillRect((i + 1) * this.size, j * this.size, this.size, this.size);
        }
      }
    }
  }
  ngOnInit(){
    let canvas= document.getElementById("canvas")! as HTMLCanvasElement;
    canvas.width=this.size*8
    canvas.height=this.size*8
    let ctx = canvas.getContext("2d")!;
    this.drawBoard(ctx)
  }
  ngAfterViewInit(){
    let canvas= document.getElementById("canvas")! as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")!;
    this.pieces=[{
    "bishop":this.blackBishop,
    "king": this.blackKing,
    "hourse" : this.blackHourse,
    "pawn": this.blackPawn,
    "queen":this.blackQueen,
    "rook":this.blackRook,
    },{
      "bishop":this.whiteBishop,
      "king": this.whiteKing,
      "hourse" : this.whiteHourse,
      "pawn": this.whitePawn,
      "queen":this.whiteQueen,
      "rook":this.whiteRook
    }]
    for(let i=0;i<2;i++){
      let k=1
      for(let j=0;j<=8;j+=7){
      this.pieces[i].rook?.InitPiece(ctx,(this.size*j),this.size*7*i,this.size)
      this.pieces[i].hourse?.InitPiece(ctx,(this.size*j)+k*(this.size*1),this.size*7*i,this.size) 
      this.pieces[i].bishop?.InitPiece(ctx,this.size*j+k*(this.size*2),this.size*7*i,this.size)
      k*=-1
      }
      this.pieces[i].king?.InitPiece(ctx,this.size*3,this.size*7*i,this.size)
    this.pieces[i].queen?.InitPiece(ctx,this.size*4,this.size*7*i,this.size)
    }
    
    for(let i=0; i<=1;i++){
      for(let j=0;j<=8;j++){
          this.pieces[i].pawn?.InitPiece(ctx,(this.size*j),this.size+this.size*(i*5),this.size)
      }
    }
    
  }
}
