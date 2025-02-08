import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clona la solicitud original y agrega el token Bearer si el usuario está autenticado
    const token = this.storageService.getToken(); // Obtén el token del almacenamiento
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // Agrega el token Bearer
        },
      });
    }

    console.log("El request nuevo es ", req);

    return next.handle(req); // Envía la solicitud modificada
  }
}
