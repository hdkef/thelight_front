import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as fromArticleAction from '../actions/article-action'
import { AppState } from "../reducers/app-reducer";
import { SendInfo } from "../actions/adm-article-action"

@Injectable()
export class ArticleEffect {

    constructor(private action$:Actions, private store:Store<AppState>, private http:HttpClient){}

    checkArticlesCache = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromArticleAction.CHECK_ARTICLES_CACHE),
            withLatestFrom(this.store.select("article")),
            switchMap((value)=>{
                console.log("checkArticlesCache", value)
                let action:fromArticleAction.CheckArticlesCache = value[0]
                let state = value[1]
                let nextpage = action.payload
                let totalpage = state.TotalPage

                if (nextpage > totalpage){
                    return of(new fromArticleAction.GetNewArticles(nextpage))
                }else{
                    return of(new fromArticleAction.GetCacheArticles(nextpage))
                }
            })
        )
    })

    getNewArticles = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromArticleAction.GET_NEW_ARTICLES),
            withLatestFrom(this.store.select("article")),
            switchMap((value)=>{
                let action:fromArticleAction.GetNewArticles = value[0]
                let state = value[1]
                let ArticlesCache = state.ArticlesCache
                if (!ArticlesCache){
                    return this.PagingByID(0,action.payload)
                }else{
                    let LastID = ArticlesCache[state.ArticlesCache.length-1].ID
                    return this.PagingByID(LastID,action.payload)}
                }
            )
        )
    })

    PagingByID(LastID:Number,Page:Number){
        let payload = JSON.stringify({LastID:LastID})
        return this.http.post(`${environment.api}${environment.articlegetall}`,payload).pipe(
            map((data)=>{
                let Articles = data["ArticlesFromServer"]
                if (!Articles){
                    return new fromArticleAction.SendInfo("NO NEW ARTICLES")
                }else{
                    return new fromArticleAction.RetrieveNewArticles({Articles:Articles,TotalPage:Page})
            }}),
            catchError((err)=>{
                    return of(new fromArticleAction.SendInfo(err.error))
            })
        )
    }

    getCacheArticles = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromArticleAction.GET_CACHE_ARTICLES),
            withLatestFrom(this.store.select("article")),
            switchMap((value)=>{
                console.log("getCacheArticles", value)
                let action:fromArticleAction.GetCacheArticles = value[0]
                let state = value[1]
                let ArticlesCache = state.ArticlesCache
                let nextpage = action.payload
                let firstslice = (<number>nextpage - 1) * 6
                let endslice = <number>nextpage * 6
                let articles = ArticlesCache.slice(firstslice,endslice)
                console.log("firstslice : ", firstslice)
                console.log("endslice : ", endslice)
                console.log("articles length from cache : ", articles.length)
                return of(new fromArticleAction.RetrieveCacheArticles(articles))
            })
        )
    })

    checkArticleCache = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromArticleAction.CHECK_ARTICLE_CACHE),
            withLatestFrom(this.store.select("article")),
            switchMap((value)=>{
                console.log("checkArticleCache", value)
                let action:fromArticleAction.CheckArticleCache = value[0]
                let state = value[1]
                let ArticlesCache = state.ArticlesCache
                if (ArticlesCache){
                    return of(new fromArticleAction.GetCacheArticle({ID:action.payload,ArticlesCache:ArticlesCache}))
                }else{
                    return of(new fromArticleAction.GetNewArticle(action.payload))
                }
            })
        )
    })

    getCacheArticle = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromArticleAction.GET_CACHE_ARTICLE),
            switchMap((action:fromArticleAction.GetCacheArticle)=>{
                console.log("getCacheArticle")
                let articleFound = action.payload.ArticlesCache.filter((article)=>{
                    return article.ID == action.payload.ID
                })[0]
                if (articleFound){
                    return of(new fromArticleAction.RetrieveCacheArticle(articleFound))
                }else{
                    return of(new fromArticleAction.GetNewArticle(action.payload.ID))
                }
            })
        )
    })

    getNewArticle = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromArticleAction.GET_NEW_ARTICLE),
            switchMap((action:fromArticleAction.GetNewArticle)=>{
                console.log("getNewArticle")
                let payload = JSON.stringify({ID:action.payload})
                return this.http.post(`${environment.api}${environment.articlegetone}`,payload).pipe(
                    map((data)=>{
                        let article = data["ArticleFromServer"]
                        return new fromArticleAction.RetrieveNewArticle(article)
                    }),
                    catchError((err)=>{
                        return of(new fromArticleAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

    deleteOne = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromArticleAction.DELETE_ONE),
            switchMap(()=>{
                return of(new SendInfo("Article deleted"))
            })
        )
    })
}