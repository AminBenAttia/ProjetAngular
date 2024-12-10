import { ChessPieceComponent } from "src/app/chess-game/chess-piece/chess-piece.component"

export type ChessPieceType = "black-bishop" | "black-hourse" |"black-king" |"black-pawn" |"black-pawn" |"black-queen" |"black-rook"
                            | "white-bishop" | "white-hourse" |"white-king" |"white-pawn" |"white-pawn" |"white-queen" |"white-rook"
type Pieces= {
  "bishop":ChessPieceComponent | undefined,
  "king": ChessPieceComponent | undefined,
  "hourse" : ChessPieceComponent | undefined,
  "pawn": ChessPieceComponent | undefined,
  "queen":ChessPieceComponent | undefined,
  "rook":ChessPieceComponent | undefined,
}
export type piecesType=[Pieces,Pieces]|[]