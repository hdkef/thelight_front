import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as fromAdmArticleAction from '../actions/adm-article-action'
import { DeleteOne } from '../actions/article-action'

@Injectable()
export class AdmArticleEffect {
    
    constructor(private action$:Actions, private http:HttpClient){}

    publishStart = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromAdmArticleAction.PUBLISH_START),
            switchMap((action:fromAdmArticleAction.PublishStart)=>{
                let payload = JSON.stringify(action.payload)
                return this.http.post(`${environment.api}${environment.publishArticle}`,payload).pipe(
                    map((data)=>{
                        return new fromAdmArticleAction.SendInfo("Article published")
                    }),
                    catchError((err)=>{
                        return of(new fromAdmArticleAction.SendInfo(err.error))
                    })
                )
            })
        )
    })


    saveStart = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromAdmArticleAction.SAVE_START),
            switchMap((action:fromAdmArticleAction.SaveStart)=>{
                let payload = JSON.stringify(action.payload)
                return this.http.post(`${environment.api}${environment.saveArticle}`,payload).pipe(
                    map((data)=>{
                        return new fromAdmArticleAction.SendInfo("Article saved")
                    }),
                    catchError((err)=>{
                        return of(new fromAdmArticleAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

    deleteStart = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromAdmArticleAction.DELETE_START),
            switchMap((action:fromAdmArticleAction.DeleteStart)=>{
                let payload = JSON.stringify({ID:action.payload})
                return this.http.post(`${environment.api}${environment.deleteArticle}`,payload).pipe(
                    map((data)=>{
                        return new DeleteOne(action.payload)
                    }),
                    catchError((err)=>{
                        return of(new fromAdmArticleAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

    editStart = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromAdmArticleAction.EDIT_START),
            switchMap((action:fromAdmArticleAction.EditStart)=>{
                let payload = JSON.stringify(action.payload)
                return this.http.post(`${environment.api}${environment.editArticle}`,payload).pipe(
                    map((data)=>{
                        return new fromAdmArticleAction.SendInfo("Article edited")
                    }),
                    catchError((err)=>{
                        return of(new fromAdmArticleAction.SendInfo(err.error))
                    })
                )
            })
        )
    })
}