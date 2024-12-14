import { Component } from '@angular/core';
import { Piece } from 'src/app/models/piece.model';
import {PieceCardComponent} from '../piece-card/piece-card.component';
import { NgFor } from '@angular/common'; 
@Component({
  selector: 'app-piece-details',
  standalone:true,
  templateUrl: './piece-details.component.html',
  styleUrls: ['./piece-details.component.css'],
  imports: [PieceCardComponent,NgFor] 
})
export class PieceDetailsComponent {
  pieces: Piece[] = [
    {
      name: 'King',
      image: 'white-king.png',
      description: 'The most important piece in chess. The king can move one square in any direction—vertically, horizontally, or diagonally. If the king is placed in check and cannot escape, the game ends in a loss.',
    },
    {
      name: 'Queen',
      image: 'white-queen.png',
      description: 'The most powerful piece, capable of moving any number of squares vertically, horizontally, or diagonally. The queen is a key piece for both attack and defense but must be protected carefully.',
    },
    {
      name: 'Rook',
      image: 'white-rook.png',
      description: 'The rook moves any number of squares along a row or column. It excels at controlling open files and ranks, often working with other rooks in the endgame.',
    },
    {
      name: 'Bishop',
      image: 'white-bishop.png',
      description: 'The bishop moves any number of squares diagonally. Each bishop is confined to squares of its starting color, so having both bishops allows full board coverage.',
    },
    {
      name: 'Knight',
      image: 'white-hourse.png',
      description: 'The knight has a unique "L-shaped" movement: two squares in one direction and one square perpendicular. It can jump over other pieces, making it a versatile tool in tight spaces.',
    },
    {
      name: 'Pawn',
      image: 'white-pawn.png',
      description: 'Pawns move forward one square but capture diagonally. On their first move, they can advance two squares. Pawns that reach the opposite side of the board can be promoted to any piece (except the king).',
    }
  ];
}
