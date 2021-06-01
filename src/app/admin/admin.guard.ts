import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../redux/reducers/app-reducer';

@Injectable()
export class AdminGuard implements CanActivate {
  
  constructor(private store:Store<AppState>, private router:Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select("auth").pipe(
        map((data)=>{
          if (!data["ID"]){
            this.router.navigateByUrl('/admin/login')
          }
          return !!data["ID"]
        })
      )
  }
  
}
