import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as fromSearchAction from '../actions/search-action'
import { AppState } from "../reducers/app-reducer";


@Injectable()
export class SearchEffect {
    constructor(private action$:Actions, private http:HttpClient, private store:Store<AppState>){}

    checkCache = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromSearchAction.CHECK_SEARCH_CACHE),
            withLatestFrom(this.store.select("search")),
            switchMap((value)=>{
                let action:fromSearchAction.CheckSearchCache = value[0]
                let state = value[1]
                let nextpage = action.payload.Page
                let totalpage = state.TotalPage
                if (nextpage > totalpage){
                    return of(new fromSearchAction.GetNew(action.payload))
                }else{
                    return of(new fromSearchAction.GetCache(nextpage))
                }
            })
        )
    })

    getNew = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromSearchAction.GET_NEW),
            withLatestFrom(this.store.select("search")),
            switchMap((value)=>{
                let action:fromSearchAction.GetNew = value[0]
                let state = value[1]
                let Key = action.payload.Key
                let Filter = action.payload.Filter
                let Page = action.payload.Page
                let ArticlesCache = state.ArticlesCache
                if (!ArticlesCache){
                    return this.PagingByID(Key,Filter,0,Page)
                }else{
                    let LastID = ArticlesCache[state.ArticlesCache.length-1].ID
                    return this.PagingByID(Key,Filter,LastID,Page)
                }
            })
        )
    })

    PagingByID(Key:string,Filter:string,LastID:Number,Page:Number){
        let payload = JSON.stringify({Key:Key,Filter:Filter,LastID:LastID})
        return this.http.post(`${environment.api}${environment.searcharticle}`,payload).pipe(
            map((data)=>{
                let Articles = data["ArticlesFromServer"]
                if (!Articles){
                    return new fromSearchAction.SendInfo("NO NEW ARTICLES")
                }else{
                    return new fromSearchAction.RetrieveNew({Articles:Articles,TotalPage:Page})
            }}),
            catchError((err)=>{
                    return of(new fromSearchAction.SendInfo(err.error))
            })
        )
    }

    GetCache = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromSearchAction.GET_CACHE),
            withLatestFrom(this.store.select("search")),
            switchMap((value)=>{
                let action:fromSearchAction.GetCache = value[0]
                let state = value[1]
                let ArticlesCache = state.ArticlesCache
                let nextpage = action.payload
                let firstslice = (<number>nextpage - 1) * 6
                let endslice = <number>nextpage * 6
                let articles = ArticlesCache.slice(firstslice,endslice)
                return of(new fromSearchAction.RetrieveCache(articles))
            })
        )
    })

    checkArticleCache = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromSearchAction.CHECK_ARTICLE_CACHE),
            withLatestFrom(this.store.select("search")),
            switchMap((value)=>{
                console.log("checkArticleCache", value)
                let action:fromSearchAction.CheckArticleCache = value[0]
                let state = value[1]
                let ArticlesCache = state.ArticlesCache
                if (ArticlesCache){
                    return of(new fromSearchAction.GetCacheArticle({ID:action.payload,ArticlesCache:ArticlesCache}))
                }else{
                    return of(new fromSearchAction.GetNewArticle(action.payload))
                }
            })
        )
    })

    getCacheArticle = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromSearchAction.GET_CACHE_ARTICLE),
            switchMap((action:fromSearchAction.GetCacheArticle)=>{
                console.log("getCacheArticle")
                let articleFound
                let articlesCache = action.payload.ArticlesCache
                for (let i=0;i < articlesCache.length;i++){
                    if (articlesCache[i].ID == action.payload.ID){
                        articleFound = articlesCache[i]
                    }
                    break
                }
                if (articleFound){
                    return of(new fromSearchAction.RetrieveCacheArticle(articleFound))
                }else{
                    return of(new fromSearchAction.GetNewArticle(action.payload.ID))
                }
            })
        )
    })

    getNewArticle = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromSearchAction.GET_NEW_ARTICLE),
            switchMap((action:fromSearchAction.GetNewArticle)=>{
                console.log("getNewArticle")
                let payload = JSON.stringify({ID:action.payload})
                return this.http.post(`${environment.api}${environment.articlegetone}`,payload).pipe(
                    map((data)=>{
                        let article = data["ArticleFromServer"]
                        return new fromSearchAction.RetrieveNewArticle(article)
                    }),
                    catchError((err)=>{
                        return of(new fromSearchAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

}