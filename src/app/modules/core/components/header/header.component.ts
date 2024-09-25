import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as AuthActions from "../../../auth/store/auth.actions"
import {Observable} from "rxjs";
import {authUserSelector} from "../../../auth/store/auth.selectors";
import {User} from "../../models/auth.model";
import {Category} from "../../models/categories.model";
import {CategoriesService} from "../../services/categories.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user$: Observable<User | null>;

  categories: Category[] = [
    { name: "cat1", shortId: 123 },
    { name: "cat2", shortId: 223 },
    { name: "cat3", shortId: 323 },
  ];

  constructor(
    private store: Store<AppState>,
    private categoryService: CategoriesService,
    private router: Router) {
    this.user$ = this.store.select(authUserSelector);
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = [...categories];
      }
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  navigateToCategory(category: Category) {
    this.router.navigate(["products"], {
      queryParams: {
        category: category.shortId,
      }
    })
  }
}
