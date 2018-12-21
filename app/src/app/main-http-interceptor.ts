import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class MainHttpInterceptor implements HttpInterceptor {
  
  private baseUrl = 'http://localhost:3000/'; // or https://localhost:8443/ for https
  
  constructor() {
  }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({url: this.baseUrl + request.url});
    
    return next.handle(request).pipe(map((result: any) => {
      if (result instanceof HttpResponse) {
        return result.clone({body: result.body.data});
      }
      return result;
    }, error => {
      console.error(error)
    }));
  }
}