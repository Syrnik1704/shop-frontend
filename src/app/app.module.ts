import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from "./modules/core/core.module";
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from "./modules/auth/auth.module";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { AuthEffects } from "./modules/auth/store/auth.effects";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authReducer } from "./modules/auth/store/auth.reducer";

@NgModule({
  declarations: [
    AppComponent,
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
      positionClass: "toast-top-center",
      timeOut: 10000,
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
