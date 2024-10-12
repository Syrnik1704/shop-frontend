import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {AuthService} from "../../../core/services/auth.service";
import {AuthResponse} from "../../../core/models/auth.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent implements OnInit {

  errorMessage!: null | string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.authService.activateAccount(params.get("uid") as string)),
    ).subscribe({
      next: (response: AuthResponse) => {
        this.router.navigate(["/login"]);
        this.toastr.success("Your account has been activated!", "SUCCESS");
      }, error: (error) => {
        this.errorMessage = error;
        this.toastr.error(`Error occurred while account activation: ${error}`, "ERROR");
      }
    })
  }
}
