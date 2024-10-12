import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AdministratorComponent } from './components/administrator/administrator.component';
import { AddCategoryFormComponent } from './components/administrator/add-category-form/add-category-form.component';
import { ManageProductsComponent } from './components/administrator/manage-products/manage-products.component';
import { AddProductFormComponent } from './components/administrator/manage-products/add-product-form/add-product-form.component';
import { DeleteProductFormComponent } from './components/administrator/manage-products/delete-product-form/delete-product-form.component';
import { UploadedImagesComponent } from './components/administrator/manage-products/add-product-form/uploaded-images/uploaded-images.component';
import { DeleteProductDialogComponent } from './components/administrator/manage-products/delete-product-form/delete-product-dialog/delete-product-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AdministratorComponent,
    AddCategoryFormComponent,
    ManageProductsComponent,
    AddProductFormComponent,
    DeleteProductFormComponent,
    UploadedImagesComponent,
    DeleteProductDialogComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule
  ]
})
export class AdministrationModule { }
