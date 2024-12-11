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
      description: 'The most important piece.',
      howToMove: 'Moves one square in any direction.'
    },
    {
      name: 'Queen',
      image: 'white-queen.png',
      description: 'The most powerful piece.',
      howToMove: 'Moves any number of squares in any direction.'
    },
    
  ];
}
