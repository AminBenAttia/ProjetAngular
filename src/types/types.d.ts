import { ComponentRef } from "@angular/core"
import { ChessPieceComponent } from "src/app/chess-game/chess-piece/chess-piece.component"

export type ChessPieceType = "bishop" | "hourse" |"king" |"pawn" |"pawn" |"queen" |"rook"
type Pieces = Map<ChessPieceType,ComponentRef<ChessPieceComponent>[]>
export type piecesType=[Pieces,Pieces]|[]