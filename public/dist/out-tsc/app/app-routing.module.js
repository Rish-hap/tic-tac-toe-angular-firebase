import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { ChoosePlayerComponent } from "./choose-player/choose-player.component";
import { GamesTableComponent } from "./components/Table/games-table/games-table.component";
import { CanActivateGuardService } from "./services/can-activate-guard.service";
const routes = [
    { path: 'choose-player', component: ChoosePlayerComponent },
    { path: 'play-game', canActivate: [CanActivateGuardService], component: BoardComponent },
    { path: 'stats', component: GamesTableComponent },
    { path: '', redirectTo: 'choose-player', pathMatch: 'full' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map