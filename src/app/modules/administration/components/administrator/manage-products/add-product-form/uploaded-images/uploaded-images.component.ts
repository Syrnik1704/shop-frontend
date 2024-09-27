import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {ImageService} from "../../../../../../core/services/image.service";
import {Image} from "../../../../../../core/models/image.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-uploaded-images',
  templateUrl: './uploaded-images.component.html',
  styleUrl: './uploaded-images.component.scss'
})
export class UploadedImagesComponent implements OnInit {
  @Input() imageUrls: Image[] = [];
  @Output() deleteImageUrl = new EventEmitter<Image[]>();

  constructor(private imageService: ImageService, private toastr: ToastrService) {}

  activeImage = '';
  errorMsg: null | string = null;

  ngOnInit(): void {
    this.activeImage = this.imageUrls[0].url;
  }

  setActiveImage(url: string) {
    this.activeImage = url;
  }

  deleteImage(url: string) {
    const [, uid] = url.split('uid=');
    this.imageService.deleteImage(uid).subscribe({
      next: () => {
        this.imageUrls = this.imageUrls.filter((image) => image.url !== url);
        this.deleteImageUrl.emit([...this.imageUrls]);
        if (this.imageUrls.length > 0) {
          this.activeImage = this.imageUrls[0].url;
        }
        this.toastr.success("Image deleted successfully", "SUCCESS");
      },
      error: (error) => {
        this.errorMsg = error;
        this.toastr.error(`Error occurred while deleting image: ${error}`, "ERROR");
      },
    });
  }
}

