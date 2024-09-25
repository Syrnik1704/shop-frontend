import {Component, AfterViewInit, ViewChild, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../../core/services/products.service";
import {SimpleProduct} from "../../../core/models/product.model";
import {MatPaginator} from "@angular/material/paginator";
import {debounceTime, distinctUntilChanged, filter, Observable, Subscription} from "rxjs";
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

  products: SimpleProduct[] = [];
  totalCount = 0;
  subscription = new Subscription();
  errorMessage: string | null = null;

  searchControl = new FormControl<string>("");
  sortControl = new FormControl<string>("");
  orderControl = new FormControl<string>("");

  filteredOptions!: Observable<SimpleProduct[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => this.productService.getProducts(1, 5, value)),
      map(({ products }) => {
        return [...products];
      })
    );
  }

  ngAfterViewInit() {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          const pageIndex = params['page'] ? Number(params['page']) : 1;
          const itemsPerPage = params['limit'] ? Number(params['limit']) : this.paginator.pageSize || 5;
          const productName = params['name'] ? params['name'] : null;
          const sort = params['sort_by'] ? params['sort_by'] : null;
          const order = params['order'] ? params['order'] : null;
          const category = params['category'] ? params['category'] : null;
          return this.productService.getProducts(
            pageIndex,
            itemsPerPage,
            productName,
            sort,
            order,
            category
          );
        }),
        map(({ products, totalCount }) => {
          this.totalCount = totalCount;
          this.products = [...products];
          // Ustaw wartości dla paginatora na podstawie URL
          this.paginator.pageIndex = this.route.snapshot.queryParamMap.get("page")
            ? Number(this.route.snapshot.queryParamMap.get("page")) - 1
            : 0;
          this.paginator.pageSize = this.route.snapshot.queryParamMap.get("limit")
            ? Number(this.route.snapshot.queryParamMap.get("limit"))
            : 5;
        })
      )
      .subscribe({
        error: (error) => {
          this.errorMessage = error;
          this.toastr.error(`Error occurred while displaying products: ${error}`, "ERROR");
        }
      });

    this.subscription.add(
      this.paginator.page.subscribe({
        next: () => {
          this.navigateToSearchedParams();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProducts() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.navigateToSearchedParams();
  }

  navigateToSearchedParams() {
    const queryParams: { [key: string]: string | number } = {
      page: this.paginator.pageIndex + 1,
      limit: this.paginator.pageSize,
    };

    const categoryShortId = this.route.snapshot.queryParamMap.get("category");

    if (categoryShortId) {
      queryParams["category"] = categoryShortId;
    }

    if (this.searchControl.value) {
      queryParams["name"] = this.searchControl.value as string;
    }

    if (this.sortControl.value) {
      queryParams['sort_by'] = this.sortControl.value;
    }

    if (this.orderControl.value) {
      queryParams['order'] = this.orderControl.value;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams
    });
  }
}
