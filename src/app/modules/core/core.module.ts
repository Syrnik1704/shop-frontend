import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterLink, RouterLinkActive} from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
