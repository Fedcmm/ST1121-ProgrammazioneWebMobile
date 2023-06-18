import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent } from "./util/page-not-found/page-not-found.component";

import { SignUpPlayerComponent } from "./player/sign-up/sign-up.component";
import { SignInPlayerComponent } from "./player/sign-in/sign-in.component";
import { PlayerProfileComponent } from "./player/player-profile/player-profile.component";
import { NewRecordComponent } from "./player/record/new-record/new-record.component";

import { SignUpGameRoomComponent } from "src/app/game-room/sign-up/sign-up.component";
import { SignInGameRoomComponent } from "./game-room/sign-in/sign-in.component";
import { CreateEventComponent } from "./game-room/event/create-event/create-event.component";

import { ViewGameComponent } from './game/view-game/view-game.component';
import { GameRoomProfileComponent } from "src/app/game-room/game-room-profile/game-room-profile.component";
import { HomeComponent } from "src/app/home/home.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },

    //region Player
    {
        path: 'player/sign-up',
        component: SignUpPlayerComponent
    },
    {
        path: 'player/sign-in',
        component: SignInPlayerComponent
    },
    {
        path: 'player/new-record',
        component: NewRecordComponent
    },
    {
        path: 'player/profile',
        component: PlayerProfileComponent
    },
    {
        path: 'player/:id',
        component: PlayerProfileComponent
    },
    //endregion

    //region GameRoom
    {
        path: 'game-room/sign-up',
        component: SignUpGameRoomComponent
    },
    {
        path: 'game-room/sign-in',
        component: SignInGameRoomComponent
    },
    {
        path: 'game-room/create-event',
        component: CreateEventComponent
    },
    {
        path: 'game-room/profile',
        component: GameRoomProfileComponent
    },
    {
        path: 'game-room/:id',
        component: GameRoomProfileComponent
    },
    //endregion

    //region Game
    {
      path: 'game/:id',
        component: ViewGameComponent
    },
    //endregion

    {
        path: '**',
        component: PageNotFoundComponent
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
