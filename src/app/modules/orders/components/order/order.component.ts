import {Component, OnInit} from '@angular/core';
import {GetOrderResponse} from "../../../core/models/order.model";
import {ActivatedRoute} from "@angular/router";
import {OrdersService} from "../../../core/services/orders.service";
import {ToastrService} from "ngx-toastr";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  errorMsg: null | string = null;
  order!: GetOrderResponse;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((paramMap) => {
          const uid = paramMap.get('uid') as string;
          return this.ordersService.getOrder(uid);
        })
      )
      .subscribe({
        next: (order) => {
          this.order = { ...order };
        },
        error: (err) => {
          this.errorMsg = err;
          this.toastr.error(`Error occurred while getting order: ${err}`, "ERROR");
        },
      });
  }
}

