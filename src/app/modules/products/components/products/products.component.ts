import {Component, AfterViewInit, ViewChild, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../../core/services/products.service";
import {SimpleProduct} from "../../../core/models/product.model";
import {MatPaginator} from "@angular/material/paginator";
import {debounceTime, distinctUntilChanged, Observable, Subscription} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements AfterViewInit, OnDestroy, OnInit {

  products: SimpleProduct[] = []
  totalCount = 0;
  subscription = new Subscription();
  errorMessage: string | null = null;

  searchControl = new FormControl<string>("");
  filteredOptions!: Observable<SimpleProduct[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => this.productService.getProducts(1, 10, value)),
      map(({ products }) => {
        console.log(products);
        return [...products];
      })
    )
  }

  ngAfterViewInit() {
    this.route.queryParamMap
      .pipe(
        switchMap((queryMap) => {
          const pageIndex = queryMap.get("page") ? Number(queryMap.get("page")) : 1;
          const itemsPerPage = queryMap.get("limit") ? Number(queryMap.get("limit")) : this.paginator.pageSize;
          const productName = queryMap.get("name") ? queryMap.get("name") : null;
          return this.productService.getProducts(pageIndex, itemsPerPage, productName);
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
            queryParams: { page: pageIndex, limit: itemsPerPage, name: this.searchControl.value }
          })
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProducts() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.paginator.pageIndex + 1,
        limit: this.paginator.pageSize,
        name: this.searchControl.value as string,
      }
    })
    // this.productService.getProducts(1, 5, this.searchControl.value).subscribe({
    //   next: ({ products, totalCount }) => {
    //     this.products = [...products];
    //     this.totalCount = totalCount;
    //   }
    // })
  }
}
