import {Component, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import {ProductsService} from "../../../core/services/products.service";
import {SimpleProduct} from "../../../core/models/product.model";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements AfterViewInit, OnDestroy {

  products: SimpleProduct[] = []
  totalCount = 0;
  subscription = new Subscription();
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }


  ngAfterViewInit() {
    this.route.queryParamMap
      .pipe(
        switchMap((queryMap) => {
          const pageIndex = queryMap.get("page") ? Number(queryMap.get("page")) : 1;
          const itemsPerPage = queryMap.get("limit") ? Number(queryMap.get("limit")) : this.paginator.pageSize;
          return this.productService.getProducts(pageIndex, itemsPerPage);
        }),
        map(({ products, totalCount }) => {
          this.totalCount = totalCount;
          this.products = [...products];
        })
      )
      .subscribe({
        error: (error) => {
          this.errorMessage = error
          this.toastr.error(`Error occurred while displaying products: ${error}`, "ERROR");
        }
      })

    this.subscription.add(
      this.paginator.page.subscribe({
        next: () => {
          const pageIndex = this.paginator.pageIndex + 1;
          const itemsPerPage = this.paginator.pageSize;
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page: pageIndex, limit: itemsPerPage }
          })
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
