import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as fromSearchAction from '../actions/search-action'


@Injectable()
export class SearchEffect {
    constructor(private action$:Actions, private http:HttpClient){}

    searchStart = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromSearchAction.SEARCH_ARTICLES_START),
            switchMap((action:fromSearchAction.SearchArticlesStart)=>{
                let payload = JSON.stringify(action.payload)
                return this.http.post(`${environment.api}${environment.searcharticle}`,payload).pipe(
                    map((data)=>{
                        let Articles = data["ArticlesFromServer"]
                        if (!Articles){
                            return new fromSearchAction.SendInfo("NO NEW ARTICLES")
                        }else{
                            return new fromSearchAction.SearchArticlesOK({Page:action.payload.Page,Articles:Articles})
                        }
                    }),
                    catchError((err)=>{
                        return of(new fromSearchAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

}