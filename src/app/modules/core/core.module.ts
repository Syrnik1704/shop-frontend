import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {errorHandlingInterceptor} from "./interceptors/error-handling.interceptor";
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {MatButton} from "@angular/material/button";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "./material/mat-paginator-custom-intl";
import {MatIcon} from "@angular/material/icon";
import {FooterComponent} from './components/footer/footer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
      CommonModule,
      RouterLink,
      RouterLinkActive,
      MatButton,
      MatIcon,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
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
