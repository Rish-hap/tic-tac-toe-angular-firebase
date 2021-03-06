import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { TimeInSecPipePipe } from './pipes/time-in-sec-pipe.pipe';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ChoosePlayerComponent } from './choose-player/choose-player.component';
import { ImagePipePipe } from './pipes/image-pipe.pipe';
import { PlayerComponent } from './player/player.component';


import { AvatarStatsComponent } from './avatar-stats/avatar-stats.component';
import { InputComponent } from './input/input.component';
import { GamesTableComponent } from './components/Table/games-table/games-table.component';
import { TableHeaderComponent } from './components/Table/table-header/table-header.component';
import { TableRowComponent } from './components/Table/table-row/table-row.component';
import { DatePipePipe } from './pipes/date-pipe.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
    TimeInSecPipePipe,
    HomeComponent,
    HeaderComponent,
    ChoosePlayerComponent,
    ImagePipePipe,
    PlayerComponent,
    AvatarStatsComponent,
    InputComponent,
    GamesTableComponent,
    TableHeaderComponent,
    TableRowComponent,
    DatePipePipe,
    PaginationComponent,
    SigninComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
