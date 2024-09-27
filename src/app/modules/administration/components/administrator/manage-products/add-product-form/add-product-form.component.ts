import { Component } from '@angular/core';
import {ImageService} from "../../../../../core/services/image.service";
import {Image} from "../../../../../core/models/image.model";
import {ToastrService} from "ngx-toastr";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Category} from "../../../../../core/models/categories.model";
import {FormService} from "../../../../../core/services/form.service";
import {CategoriesService} from "../../../../../core/services/categories.service";
import {ProductsService} from "../../../../../core/services/products.service";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {AddProductData} from "../../../../../core/models/product.model";
import {PostProduct} from "../../../../../core/models/forms.model";

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent {

  config: AngularEditorConfig;

  selectedFile: File | null = null;
  fileName = '';

  imageUrls: Image[] = [];
  errorImageUploadMsg: string | null = null;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  categories: BehaviorSubject<Category[]>;
  addProductForm: FormGroup<PostProduct>;

  constructor(
    private imageService: ImageService,
    private formService: FormService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {
    this.config = this.imageService.config;
    this.categories = this.categoriesService.categories;
    this.addProductForm = this.formService.initAddProductForm();
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
    }
  }

  uploadFile() {
    this.errorImageUploadMsg = null;
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('multipartFile', this.selectedFile);
      console.log(formData.get('multipartFile'));

      this.imageService.addImage(formData).subscribe({
        next: (response) => {
          this.imageUrls = [...this.imageUrls, { ...response }];
          this.toastr.success("File uploaded successfully", "SUCCESS");
        },
        error: (error) => {
          this.errorImageUploadMsg = error;
          this.toastr.error(`Error occurred while uploading image: ${error}`, "ERROR");
        },
      });
    }
  }

  setActiveImageUrls(imageArr: Image[]) {
    this.imageUrls = [...imageArr];
  }

  get controls() {
    return this.addProductForm.controls;
  }

  get parameters(): FormArray<
    FormGroup<{ value: FormControl<string>; key: FormControl<string> }>> {
    return this.addProductForm.controls.parameters;
  }

  getErrorMessage(control: FormControl<string>) {
    return this.formService.getErrorMessage(control);
  }

  addProduct() {
    const formValue = this.addProductForm.getRawValue();
    const parametersObject: { [key: string]: string } = {};

    formValue.parameters.forEach((item) => {
      parametersObject[item.key] = item.value;
    });

    const parameters = `${JSON.stringify(parametersObject)}`;

    const imagesUid = this.imageUrls.map((url) => {
      const [, uid] = url.url.split('uid=');
      return uid;
    });

    const addProductData: AddProductData = {
      ...formValue,
      price: Number(formValue.price),
      parameters,
      imagesUid,
    };

    this.productsService.addProduct(addProductData).subscribe({
      next: () => {
        console.log(addProductData.mainDescription)
        this.addProductForm.reset();
        this.imageUrls = [];
        this.successMessage = 'Product added successfully';
        this.toastr.success("Product added successfully", "SUCCESS");
      },
      error: (error) => {
        this.errorMessage = error;
        this.toastr.error(`Error occurred while adding product: ${error}`, "ERROR");
      },
    });
  }

  deleteParameter(i: number) {
    this.parameters.removeAt(i);
  }

  addParameter() {
    const newGroup = new FormGroup({
      key: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      value: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    this.parameters.push(newGroup);
  }

}

