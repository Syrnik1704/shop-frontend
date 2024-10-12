import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AddCategoryForm} from "../../../../core/models/forms.model";
import {FormService} from "../../../../core/services/form.service";
import {CategoriesService} from "../../../../core/services/categories.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrl: './add-category-form.component.scss'
})
export class AddCategoryFormComponent {
  addCategoryForm!: FormGroup<AddCategoryForm>;

  successMsg: string | null = null;
  errorMsg: string | null = null;

  constructor(
    private formService: FormService,
    private categoriesService: CategoriesService,
    private toastr: ToastrService
  ) {
    this.addCategoryForm = this.formService.initAddCategoryForm();
  }

  onAddCategory() {
    this.categoriesService
      .addCategory(this.addCategoryForm.getRawValue())
      .subscribe({
        next: () => {
          this.successMsg = 'Category added successfully.';
          this.toastr.success("Category added successfully.!", "SUCCESS");
        },
        error: (error) => {
          this.errorMsg = error;
          this.toastr.error(`Error occurred while adding category: ${error}`, "ERROR");
        },
      });
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

}
