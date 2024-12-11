import { Component ,Input} from '@angular/core';
import { Piece } from 'src/app/models/piece.model';

@Component({
  selector: 'app-piece-card',
  standalone:true,
  templateUrl: './piece-card.component.html',
  styleUrls: ['./piece-card.component.css']
})
export class PieceCardComponent {
  @Input() piece!: Piece;
}
