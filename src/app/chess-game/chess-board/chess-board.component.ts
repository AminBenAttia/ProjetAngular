import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chess-board',
  standalone:true,
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
  imports:[CommonModule]
})
export class ChessBoardComponent {
  rows = Array(8).fill(0);
  cols = Array(8).fill(0);
  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
}
