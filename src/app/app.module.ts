import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import {CoreModule} from "./modules/core/core.module";
import { EffectsModule } from '@ngrx/effects';
import {AuthModule} from "./modules/auth/auth.module";
import {authReducer} from "./modules/auth/store/auth.reducer";
import {ToastrModule} from "ngx-toastr";
import {AuthEffects} from "./modules/auth/store/auth.effects";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({auth: authReducer}),
    EffectsModule.forRoot([AuthEffects]),
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
      timeOut: 3000,
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
