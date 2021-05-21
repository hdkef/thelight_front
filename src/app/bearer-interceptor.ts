import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem("Bearer")
        if (token){
            let authorizedReq = req.clone({headers:req.headers.append("Bearer",token)})
            return next.handle(authorizedReq)
        }else{
            return next.handle(req)
        }
    }
}
