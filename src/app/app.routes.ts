import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PieceDetailsComponent } from './pieces/piece-details/piece-details.component';
import { LoginComponent } from './authentication/login/login.component';
import { ChessGameComponent } from './chess-game/chess-game.component';
import { SignupComponent } from './authentication/signup/signup.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'Tutorial',component:PieceDetailsComponent},
    {path:'Chess',component:ChessGameComponent}

];
