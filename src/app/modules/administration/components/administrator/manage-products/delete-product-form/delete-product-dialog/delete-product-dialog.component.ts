import {Component, OnInit, Inject} from '@angular/core';
import {Product} from "../../../../../../core/models/product.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductsService} from "../../../../../../core/services/products.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrl: './delete-product-dialog.component.scss'
})
export class DeleteProductDialogComponent implements OnInit {
  product: Product | null = null;
  errorMessage: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { name: string; date: string },
    private productsService: ProductsService,
    private dialogRef: MatDialogRef<DeleteProductDialogComponent>,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.productsService.getProduct(this.data.name, this.data.date).subscribe({
      next: (product) => {
        // @ts-ignore
        this.product = { ...product };
      },
      error: (error) => {
        this.errorMessage = error;
        this.toastr.error(`Error occurred while getting product to delete: ${error}`, "ERROR");
      },
    });
  }

  deleteProduct() {
    if (this.product) {
      this.productsService.deleteProduct(this.product.uid).subscribe({
        next: () => {
          this.toastr.success("Product has been deleted successfully", "SUCCESS");
          this.dialogRef.close();
        },
        error: (error) => {
          this.errorMessage = error;
          this.toastr.error(`Error occurred while deleting product: ${error}`, "ERROR");
        },
      });
    }
  }
}

