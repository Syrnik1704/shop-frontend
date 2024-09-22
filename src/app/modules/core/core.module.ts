import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {errorHandlingInterceptor} from "./interceptors/error-handling.interceptor";
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {MatButton} from "@angular/material/button";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "./material/mat-paginator-custom-intl";


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
    ),
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    }
  ]
})
export class CoreModule {}
