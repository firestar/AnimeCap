import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {RouterModule, Routes}   from '@angular/router';
import { MaterialModule } from '@angular/material';

import { LoginForm } from './users/login/login.component';
import { RegisterForm } from './users/register/register.component';
import { TopNavigationBar } from './navigation.component';
import { ShowIndex } from './show/showindex.component';
import { LogoutSend } from './users/logoutsend.component';
import { FourOFour } from './fourofour.component';
import { WatchPage } from './episode/watch.component';
import { URIPipe } from './touri.pipe';
import { ShowPage } from './show/showpage.component';
import { EpisodeElement } from './episode/episode.component';
import { ShowCreate } from './show/showcreate.component';

import { LoginCheck } from './users/logincheck';

import { UserService } from './database/user.service';
import { AccountService } from './database/account.service';
import { ShowService } from './database/show.service';
import { EpisodeService } from './database/episode.service';
import { FavoriteService } from './database/favorite.service';
import { FTPService } from './database/ftp.service';

import { RoundPipe } from './touri.pipe';

const routes :Routes = [
  { path: '', redirectTo:"/show/list", pathMatch:"full" },
  {
    path: 'show',
    children:[
      { path:"list", component: ShowIndex, canActivate: [LoginCheck] }
    ]
  },
  { path: 'login', component: LoginForm },
  { path: 'watch/:episode/:show/:epstring', component: WatchPage },
  { path: 'show/:show/:showstring', component: ShowPage },
  { path: 'show/create', component: ShowCreate},
  { path: 'logout', component: LogoutSend },
  { path: 'register', component: RegisterForm },
  { path: '**', component: FourOFour }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginForm,
    RegisterForm,
    TopNavigationBar,
    ShowIndex,
    LogoutSend,
    FourOFour,
    WatchPage,
    URIPipe,
    ShowPage,
    EpisodeElement,
    RoundPipe,
    ShowCreate
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserService, LoginCheck, AccountService, ShowService, EpisodeService, FavoriteService, FTPService],
  bootstrap: [AppComponent]
})
export class AppModule {}
