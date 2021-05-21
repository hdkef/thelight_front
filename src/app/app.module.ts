import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppReducer } from './redux/reducers/app-reducer';
import { AuthEffect } from './redux/effects/auth-effect';
import { ArticleEffect } from './redux/effects/article-effect';
import { CommentEffect } from './redux/effects/comment-effect';
import { MediaEffect } from './redux/effects/media-effect';
import { BearerInterceptor } from './bearer-interceptor';
import { ClearbearerInterceptor } from './clearbearer-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([AuthEffect,ArticleEffect,CommentEffect, MediaEffect]),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:BearerInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ClearbearerInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
