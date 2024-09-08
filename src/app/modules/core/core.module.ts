import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
