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
import { ViewRecordsComponent } from './player/record/view-records/view-records.component';
import { ProfileComponent } from './player/profile/profile.component';

import { SignUpGameRoomComponent } from "./game-room/sign-up/sign-up.component";
import { SignInGameRoomComponent } from "./game-room/sign-in/sign-in.component";
import { CreateEventComponent } from "./game-room/event/create-event/create-event.component";
import { DeleteEventsComponent } from './game-room/event/delete-events/delete-events.component';
import { ViewEventsComponent } from './game-room/event/view-event/view-event.component';
import { GameRoomProfileComponent } from './game-room/profile/game-room-profile.component';
import { GameRoomGamesComponent } from './game-room/games/game-room-games.component';
import { GameRoomRecordComponent } from './game-room/record/view-records/game-room-record.component';
import { VerifyRecordComponent } from "./game-room/record/verify-record/verify-record.component";
import { DeleteRecordComponent } from './game-room/record/delete-record/delete-record.component';


@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,

        //region Player
        SignUpPlayerComponent,
        SignInPlayerComponent,
        NewRecordComponent,
        //endregion

        //region GameRoom
        SignUpGameRoomComponent,
        SignInGameRoomComponent,
        CreateEventComponent,
        VerifyRecordComponent,
        GameRoomProfileComponent,
        GameRoomGamesComponent,
        GameRoomRecordComponent,
        DeleteEventsComponent,
        DeleteRecordComponent,
        ViewRecordsComponent,
        ProfileComponent,
        ViewEventsComponent,
        //endregion
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        AppRoutingModule,
        RouterOutlet,
        ReactiveFormsModule
    ],
    providers: [AuthenticationInterceptorProvider],
    bootstrap: [AppComponent]
})
export class AppModule {
}
