import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdministratorComponent} from "./components/administrator/administrator.component";
import {AddCategoryFormComponent} from "./components/administrator/add-category-form/add-category-form.component";
import {ManageProductsComponent} from "./components/administrator/manage-products/manage-products.component";
import {adminGuard} from "../core/guards/admin.guard";

const routes: Routes = [
  {
    path: 'manage',
    component: AdministratorComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'categories',
        component: AddCategoryFormComponent,
      },
      {
        path: 'products',
        component: ManageProductsComponent,
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
