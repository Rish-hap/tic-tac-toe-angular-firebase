import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { ChoosePlayerComponent } from "./choose-player/choose-player.component"
import { GamesTableComponent } from "./components/Table/games-table/games-table.component"
import { CanActivateGuardService } from "./services/can-activate-guard.service"


const routes: Routes = [
  { path: 'choose-player', component: ChoosePlayerComponent },
  { path: 'play-game', canActivate: [CanActivateGuardService], component: BoardComponent },
  { path: 'stats', component: GamesTableComponent },
  { path: '', redirectTo: 'choose-player', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
