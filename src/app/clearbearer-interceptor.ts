import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppState } from "./redux/reducers/app-reducer";
import * as fromAuthAction from './redux/actions/auth-action'
import { Injectable } from "@angular/core";

@Injectable()
export class ClearbearerInterceptor implements HttpInterceptor{
    
    constructor(private store:Store<AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err:HttpErrorResponse)=>{
                console.log("catchError", err.headers.get("Clearbearer"))
                if (err.headers.get("Clearbearer")){
                    this.store.dispatch(new fromAuthAction.LogoutStart())
                }else{
                    return throwError(err)
                }
            })
        )
    }
}
