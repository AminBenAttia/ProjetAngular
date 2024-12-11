import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PieceDetailsComponent } from './pieces/piece-details/piece-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChessBoardComponent } from './chess-game/chess-board/chess-board.component';
import { LoginComponent } from './authentication/login/login.component';

export const routes: Routes = [
    {path:'',component:ChessBoardComponent},
    {path:'Tutorial',component:PieceDetailsComponent},
    {path:'Login',component:LoginComponent}
];
