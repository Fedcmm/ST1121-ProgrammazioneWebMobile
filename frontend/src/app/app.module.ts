import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from "@angular/router";

import { NavBarComponent } from "./util/nav-bar/nav-bar.component";
import { AuthenticationInterceptorProvider } from "./util/authentication.interceptor";

import { SignUpPlayerComponent } from "./player/sign-up/sign-up.component";
import { SignInPlayerComponent } from "./player/sign-in/sign-in.component";
import { NewRecordComponent } from "./player/record/new-record/new-record.component";
import { PlayerViewRecordsComponent } from './player/record/player-view-records/player-view-records.component';
import { PlayerProfileComponent } from './player/player-profile/player-profile.component';

import { SignUpGameRoomComponent } from "./game-room/sign-up/sign-up.component";
import { SignInGameRoomComponent } from "./game-room/sign-in/sign-in.component";
import { CreateEventComponent } from "./game-room/event/create-event/create-event.component";
import { DeleteEventsComponent } from './game-room/event/delete-events/delete-events.component';
import { GameRoomProfileComponent } from './game-room/game-room-profile/game-room-profile.component';
import { GameRoomGamesComponent } from './game-room/games/game-room-games.component';
import { GameRoomViewRecordsComponent } from 'src/app/game-room/record/game-room-view-records/game-room-view-records.component';
import { VerifyRecordComponent } from "./game-room/record/verify-record/verify-record.component";
import { GameRoomDeleteRecordsComponent } from 'src/app/game-room/record/game-room-delete-records/game-room-delete-records.component';
import { GameRoomViewEventsComponent } from "src/app/game-room/event/game-room-view-events/game-room-view-events.component";
import { NgOptimizedImage } from "@angular/common";


@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,

        //region Player
        SignUpPlayerComponent,
        SignInPlayerComponent,
        PlayerProfileComponent,
        NewRecordComponent,
        PlayerViewRecordsComponent,
        //endregion

        //region GameRoom
        SignUpGameRoomComponent,
        SignInGameRoomComponent,
        CreateEventComponent,
        VerifyRecordComponent,
        GameRoomProfileComponent,
        GameRoomGamesComponent,
        GameRoomViewRecordsComponent,
        DeleteEventsComponent,
        GameRoomDeleteRecordsComponent,
        GameRoomViewEventsComponent
        //endregion
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        AppRoutingModule,
        RouterOutlet,
        ReactiveFormsModule,
        NgOptimizedImage
    ],
    providers: [AuthenticationInterceptorProvider],
    bootstrap: [AppComponent]
})
export class AppModule {
}
