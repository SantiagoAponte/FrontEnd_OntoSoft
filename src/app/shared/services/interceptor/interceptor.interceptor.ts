import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SessionService } from '../session/session.service';
import { Router } from '@angular/router';
import { GenericsService } from '../generics/generics.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private _sessionService: SessionService, private _genericService: GenericsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._genericService.show();
    const token:string = this._sessionService.getStorege('Token');
    let req = request;
    
    if(token){
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`,
        }
      })
    }
    return next.handle(req).pipe(
      finalize(()=> this._genericService.hide()));
  }
}