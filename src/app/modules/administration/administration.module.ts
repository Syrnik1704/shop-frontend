import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AddCategoryFormComponent } from './components/administrator/add-category-form/add-category-form.component';
import { ManageProductsComponent } from './components/administrator/manage-products/manage-products.component';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import { AddProductFormComponent } from './components/administrator/manage-products/add-product-form/add-product-form.component';
import { DeleteProductFormComponent } from './components/administrator/manage-products/delete-product-form/delete-product-form.component';
import { UploadedImagesComponent } from './components/administrator/manage-products/add-product-form/uploaded-images/uploaded-images.component';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {MatOption, MatSelect} from "@angular/material/select";


@NgModule({
  declarations: [
    AdministratorComponent,
    AddCategoryFormComponent,
    ManageProductsComponent,
    AddProductFormComponent,
    DeleteProductFormComponent,
    UploadedImagesComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    AngularEditorModule,
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatLabel,
    MatError,
    MatIcon,
    MatExpansionPanelDescription,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatAccordion,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatSelect,
    MatOption
  ]
})
export class AdministrationModule { }
