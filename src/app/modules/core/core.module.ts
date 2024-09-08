import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {errorHandlingInterceptor} from "./interceptors/error-handling.interceptor";
import { provideHttpClient, withInterceptors } from '@angular/common/http';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
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
