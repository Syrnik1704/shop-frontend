import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Category, PostCategory} from "../models/categories.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = `${environment.apiUrl}/category`;
  categories = new BehaviorSubject<Category[]>([]);

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}`).pipe(
      tap((categories) => {
        this.categories.next(categories);
      })
    );

  }

  addCategory(body: PostCategory): Observable<{ timestamp: string; message: string }> {
    return this.httpClient.post<{ timestamp: string; message: string }>(
      `${this.apiUrl}`,
      body,
      {
        withCredentials: true,
      }
    );
  }

}
