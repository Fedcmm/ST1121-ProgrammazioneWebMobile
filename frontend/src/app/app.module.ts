import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {RouterOutlet} from "@angular/router";

import { PageNotFoundComponent } from "./util/page-not-found/page-not-found.component";
import { NavBarComponent } from "./util/nav-bar/nav-bar.component";

import { SignUpPlayerComponent } from "./player/sign-up/sign-up.component";
import { SignInPlayerComponent } from "./player/sign-in/sign-in.component";
import { NewRecordComponent } from "./player/record/new-record/new-record.component";

import { SignUpGameRoomComponent } from "./game-room/sign-up/sign-up.component";
import { SignInGameRoomComponent } from "./game-room/sign-in/sign-in.component";
import { CreateEventComponent } from "./game-room/event/create-event/create-event.component";
import { VerifyRecordComponent } from "./game-room/record/verify-record/verify-record.component";
import { GameRoomProfileComponent } from './game-room/profile/game-room-profile.component';
import { GameRoomSideBarComponent } from './game-room/side-bar/game-room-side-bar.component';
import { GameRoomInfoComponent } from './game-room/info/game-room-info.component';
import { GameRoomEventsComponent } from './game-room/event/view-events/game-room-events.component';
import { GameRoomGamesComponent } from './game-room/games/game-room-games.component';
import { GameRoomRecordComponent } from './game-room/record/view-records/game-room-record.component';
import { DeleteEventComponent } from './game-room/event/delete-event/delete-event.component';
import { DeleteRecordComponent } from './game-room/record/delete-record/delete-record.component';
import { ViewRecordComponent } from './player/record/view-records/view-record.component';
import { ProfileComponent } from './player/profile/profile.component';
import { InfoComponent } from './player/info/info.component';
@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
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
        GameRoomSideBarComponent,
        GameRoomInfoComponent,
        GameRoomEventsComponent,
        GameRoomGamesComponent,
        GameRoomRecordComponent,
        DeleteEventComponent,
        DeleteRecordComponent,
        ViewRecordComponent,
        ProfileComponent,
        InfoComponent,
        //endregion

    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        AppRoutingModule,
        RouterOutlet
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
