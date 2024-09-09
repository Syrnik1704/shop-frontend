import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {errorHandlingInterceptor} from "./interceptors/error-handling.interceptor";
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatButton,
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    provideHttpClient(
      withInterceptors([errorHandlingInterceptor])
    )
  ]
})
export class CoreModule {}
