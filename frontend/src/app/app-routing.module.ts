import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

import {SignUpPlayerComponent} from "./player/sign-up/sign-up.component";
import {SignInPlayerComponent} from "./player/sign-in/sign-in.component";
import {NewRecordComponent} from "./player/new-record/new-record.component";

import {SignUpGameRoomComponent} from "./game-room/sign-up/sign-up.component";
import {SignInGameRoomComponent} from "./game-room/sign-in/sign-in.component";
import {CreateEventComponent} from "./game-room/create-event/create-event.component";
import {VerifyRecordComponent} from "./game-room/verify-record/verify-record.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/signup',
        pathMatch: 'full'
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
        path: 'game-room/verify-record',
        component: VerifyRecordComponent
    },
    //endregion

    {
        path: '**',
        component: PageNotFoundComponent
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
