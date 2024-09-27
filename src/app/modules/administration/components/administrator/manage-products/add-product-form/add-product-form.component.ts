import { Component } from '@angular/core';
import {ImageService} from "../../../../../core/services/image.service";
import {Image} from "../../../../../core/models/image.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent {
  selectedFile: File | null = null;
  fileName = '';

  imageUrls: Image[] = [];
  errorImageUploadMsg: string | null = null;

  constructor(private imageService: ImageService, private toastr: ToastrService) {}

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
          this.toastr.success("File uploaded successfully.!", "SUCCESS");
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
}

