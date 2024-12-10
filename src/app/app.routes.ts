import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PieceCardComponent } from './pieces/piece-card/piece-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChessBoardComponent } from './chess-game/chess-board/chess-board.component';

export const routes: Routes = [
    {path:'',component:ChessBoardComponent},
    {path:'Tutorial',component:PieceCardComponent},
    {path:'Login',component:PieceCardComponent}
];
