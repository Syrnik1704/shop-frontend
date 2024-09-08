import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      let errorMsg = "";

      if (error.status >= 400 && error.status < 500) {
        errorMsg = error.error.message || "Error occurred. Try again.";
      } else {
        errorMsg = "Error occurred. Try again.";
      }

      return throwError(() => new Error(errorMsg));
    })
  );
};
