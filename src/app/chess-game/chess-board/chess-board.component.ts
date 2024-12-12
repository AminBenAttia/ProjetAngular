import { CommonModule } from '@angular/common';
import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ChessPieceComponent } from "../chess-piece/chess-piece.component";
import { ChessPieceType, piecesType } from 'src/types/types';
import { black, green, red, size, white } from 'src/utils/color';

@Component({
  selector: 'app-chess-board',
  standalone: true,
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
  imports: [CommonModule, ChessPieceComponent]
})
export class ChessBoardComponent {
  rows = Array(8).fill(0);
  cols = Array(8).fill(0);
  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  size: number = size
  canvas: HTMLCanvasElement | undefined
  constructor(private viewContainer: ViewContainerRef) { }
  pieces: piecesType = []
  piecesMap: Map<{ x: number, y: number }, ComponentRef<ChessPieceComponent>> = new Map()
  moveMode = false
  selectedPiece: ChessPieceComponent | undefined
  availibeBlocks: { x: number, y: number }[] | undefined
  killBlocks: { x: number, y: number }[] | undefined
  turn: "b" | "w" = "b"
  piecesToGenerate: { type: ChessPieceType, positions: { x: number, y: number }[] }[] = [
    { type: 'rook', positions: [{ x: 0, y: 0 }, { x: 0, y: 7 }] },
    { type: "hourse", positions: [{ x: 0, y: 1 }, { x: 0, y: 6 }] },
    { type: "bishop", positions: [{ x: 0, y: 2 }, { x: 0, y: 5 }] },
    { type: 'king', positions: [{ x: 0, y: 3 }] },
    { type: 'queen', positions: [{ x: 0, y: 4 }] },
  ]
  mapGet(map: Map<{ x: number, y: number }, ComponentRef<ChessPieceComponent>>, mapKey: { x: number, y: number }) {
    for (let [key, val] of map) {
      if (key.x == mapKey.x && key.y == mapKey.y) return val
    }
    return undefined
  }
  changeMapKey(map: Map<{ x: number, y: number }, ComponentRef<ChessPieceComponent>>, oldKey: { x: number, y: number }, newKey: { x: number, y: number }) {
    let piece: ComponentRef<ChessPieceComponent> | undefined
    let newMap: Map<{ x: number, y: number }, ComponentRef<ChessPieceComponent>> = new Map()
    for (let [key, val] of map) {
      if (key.x == oldKey.x && key.y == oldKey.y) {
        piece = val
      } else {
        newMap.set(key, val)
      }
    }
    if (piece)
      newMap.set(newKey, piece)
    return newMap
  }
  colorBlock(ctx: CanvasRenderingContext2D, x: number, y: number, color: string,padding:number=0) {
    ctx.fillStyle = color;
    ctx.fillRect(y * this.size+(padding/2), x * this.size+(padding/2), this.size-padding, this.size-padding);
  }
  drawBoard(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < 8; i += 2) {
      for (let j = 0; j < 8; j++) {
        if (j % 2 == 0) {
          ctx.fillStyle = black;
          ctx.fillRect(i * this.size, j * this.size, this.size, this.size);
          ctx.fillStyle = white;
          ctx.fillRect((i + 1) * this.size, j * this.size, this.size, this.size);
        } else {
          ctx.fillStyle = white;
          ctx.fillRect(i * this.size, j * this.size, this.size, this.size);
          ctx.fillStyle = black;
          ctx.fillRect((i + 1) * this.size, j * this.size, this.size, this.size);
        }
      }
    }
  }
  generatePieces(ctx: CanvasRenderingContext2D) {
    for (let k = 0; k < 2; k++)
      for (let piece of this.piecesToGenerate) {
        for (let pos of piece.positions) {
          let comp = this.viewContainer.createComponent(ChessPieceComponent)
          comp.instance.InitPiece(ctx, pos.y * this.size, (pos.x + k * 7) * this.size, piece.type, k == 0 ? 'b' : "w", this.size)
          this.pieces[k].get(piece.type)?.push(comp)
          this.piecesMap.set({ x: comp.instance.x, y: comp.instance.y }, comp)
        }
      }
  }
  generatePawns(ctx: CanvasRenderingContext2D) {
    for (let k = 0; k < 2; k++)
      for (let i = 0; i < 8; i++) {
        let comp = this.viewContainer.createComponent(ChessPieceComponent)
        comp.instance.InitPiece(ctx, i * this.size, (k * 5) * this.size + this.size, "pawn", k == 0 ? 'b' : "w", this.size)
        this.pieces[k].get("pawn")?.push(comp)
        this.piecesMap.set({ x: comp.instance.x, y: comp.instance.y }, comp)
      }
  }
  ngOnInit() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement
    this.canvas!.width = this.size * 8
    this.canvas!.height = this.size * 8
    let ctx = this.canvas!.getContext("2d")!;
    for (let i = 0; i < 2; i++) {
      let m = new Map<ChessPieceType, ComponentRef<ChessPieceComponent>[]>()
      m.set('bishop', [])
      m.set('hourse', [])
      m.set('king', [])
      m.set('pawn', [])
      m.set('queen', [])
      m.set('rook', [])
      this.pieces[i] = m
    }
    this.drawBoard(ctx)
    this.generatePieces(ctx)
    console.log(this.pieces[0])
    this.generatePawns(ctx)
  }
  removePiece(piece: ChessPieceComponent) {
    let newMap: Map<{ x: number, y: number }, ComponentRef<ChessPieceComponent>> = new Map()
    for (let [key, val] of this.piecesMap) {
      if (!(key.x == piece.x && key.y == piece.y)) {
        newMap.set(key, val)
      }
    }
    this.piecesMap = newMap
    let aux:ComponentRef<ChessPieceComponent>[]=[]
    for(let p of this.pieces[piece.color == "b" ? 0 : 1]!.get(piece.pieceType)!){
      aux.push(p)
    }
    while(this.pieces[piece.color == "b" ? 0 : 1]!.get(piece.pieceType)!.length>0){
      this.pieces[piece.color == "b" ? 0 : 1]?.get(piece.pieceType)!.pop()
    }
  for(let p of aux){
    if (!(p.instance.x == piece.x && p.instance.y == piece.y)) {
      this.pieces[piece.color == "b" ? 0 : 1]?.get(piece.pieceType)!.push(p)
    }
  }
  }
  where(ev: MouseEvent) {
    let y = Math.floor((ev.clientX - this.canvas!.offsetLeft) / this.size)
    let x = Math.floor((ev.clientY - this.canvas!.offsetTop) / this.size)
    let ctx = this.canvas?.getContext("2d")!
    if (!this.moveMode) {
      for (let [key, val] of this.pieces[this.turn == "b" ? 0 : 1]!) {
        for (let piece of val) {
          if (piece.instance.checkIsInBlock(x, y)) {
            this.selectedPiece = piece.instance
          }
        }
      }
      if (this.selectedPiece) {
        let { greenBlocks, canKill } = this.selectedPiece!.canMove(this.pieces, this.turn)
        this.availibeBlocks = greenBlocks
        this.killBlocks = canKill
        if (this.availibeBlocks)
          for (let block of this.availibeBlocks) {
            this.colorBlock(ctx, block.x, block.y, green)
          }
        if (this.killBlocks)
          for (let block of this.killBlocks) {
            this.mapGet(this.piecesMap, block)?.instance.colorUnder(ctx, red)
          }
          this.moveMode = !this.moveMode
      }
    } else {
      if(this.selectedPiece){
      let canMove = false
      if (this.availibeBlocks) {
        for (let block of this.availibeBlocks) {
          if (x == block.x && y == block.y) canMove = true
          if (Math.abs(block.x - block.y) % 2 != 0) {
            this.colorBlock(ctx, block.x, block.y, white)
          } else {
            this.colorBlock(ctx, block.x, block.y, black)
          }
        }
      }
      if (!canMove) {
        if (this.killBlocks) {
          let pieceToKill:ComponentRef<ChessPieceComponent>|undefined
          for (let block of this.killBlocks) {
            let piece = this.mapGet(this.piecesMap, { x:block.x, y:block.y })
            if (x == block.x && y == block.y) {
              canMove = true
              if (piece) {
                pieceToKill=piece
              }  
            }
            if (Math.abs(block.x - block.y) % 2 != 0) {
              piece?.instance.colorUnder(ctx, white)
            } else {
               piece?.instance.colorUnder(ctx, black)
            }
          }
          if(pieceToKill){
            pieceToKill.destroy()
            this.removePiece(pieceToKill.instance)
          }
        }
      }
      if (canMove) {
        this.piecesMap = this.changeMapKey(this.piecesMap, { x: this.selectedPiece.x, y: this.selectedPiece.y }, { x, y })
        this.selectedPiece.moveTo(ctx, x, y)
        this.turn = this.turn == "b" ? "w" : "b"
      }
      this.selectedPiece = undefined
    }
    this.moveMode = !this.moveMode
  }
  
  }
}
