import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../../core/services/orders.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GetOrdersResponse} from "../../../core/models/order.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: GetOrdersResponse[] = [];
  errorMsg: null | string = null;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe({
      next: (orders) => {
        this.orders = [...orders];
      },
      error: (err) => {
        this.errorMsg = err;
        this.toastr.error(`Error occurred while getting orders: ${err}`, "ERROR");
      },
    });
  }

  navigateToDetails(uid: string) {
    this.router.navigate(['orders', uid]);
  }

}
