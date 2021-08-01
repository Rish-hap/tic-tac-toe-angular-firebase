import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { ChoosePlayerComponent } from "./choose-player/choose-player.component"
import { SigninComponent } from './components/signin/signin.component';
import { GamesTableComponent } from "./components/Table/games-table/games-table.component"
import { CanActivateGuardService } from "./services/can-activate-guard.service"
import { AuthGuard } from './gurards/auth.guard';
import { NoAuthGuard } from "./gurards/no-auth.guard"


const routes: Routes = [
  { path: 'choose-player', canActivate: [AuthGuard], component: ChoosePlayerComponent },
  { path: 'play-game', canActivate: [CanActivateGuardService, AuthGuard], component: BoardComponent },
  { path: 'stats', canActivate: [AuthGuard], component: GamesTableComponent },
  { path: 'signin', canActivate: [NoAuthGuard], component: SigninComponent },
  { path: '', redirectTo: 'signin', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
