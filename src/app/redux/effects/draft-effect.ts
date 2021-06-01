import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as fromDraftAction from '../actions/draft-action'
import { AppState } from "../reducers/app-reducer";

@Injectable()
export class DraftEffect {

    constructor(private action$:Actions, private http:HttpClient, private store:Store<AppState>){}

    checkCacheDrafts = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromDraftAction.CHECK_CACHE_DRAFTS),
            withLatestFrom(this.store.select("draft")),
            switchMap((value)=>{
                let action:fromDraftAction.CheckCacheDrafts = value[0]
                let state = value[1]
                let totalpage = state.TotalPage
                let nextpage = action.payload
                if (nextpage > totalpage){
                    return of(new fromDraftAction.GetNewDrafts(nextpage))
                }else{
                    return of(new fromDraftAction.GetCacheDrafts(nextpage))
                }
            })
        )
    })

    getNewDrafts = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromDraftAction.GET_NEW_DRAFTS),
            withLatestFrom(this.store.select("draft")),
            switchMap((value)=>{
                let action:fromDraftAction.GetNewDrafts = value[0]
                let state = value[1]
                let draftsCache = state.DraftsCache
                let page = action.payload
                if (draftsCache){
                    let LastID = draftsCache[draftsCache.length-1].ID
                    return this.PagingByID(LastID,page)
                }else{
                    return this.PagingByID(0,page)
                }
            })
        )
    })

    PagingByID(LastID:Number, TotalPage:Number){
        let payload = JSON.stringify({LastID:LastID})
        return this.http.post(`${environment.api}${environment.draftgetall}`,payload).pipe(
            map((data)=>{
                let drafts = data["ArticlesFromServer"]
                if (!drafts){
                    return new fromDraftAction.SendInfo("NO NEW DRAFTS")
                }else{
                    return new fromDraftAction.RetrieveNewDrafts({TotalPage:TotalPage,Drafts:drafts})
                }
            }),
            catchError((err)=>{
                return of(new fromDraftAction.SendInfo(err.error))
            })
        )
    }

    getCacheDrafts = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromDraftAction.GET_CACHE_DRAFTS),
            withLatestFrom(this.store.select("draft")),
            switchMap((value)=>{
                let action:fromDraftAction.GetCacheDrafts = value[0]
                let state = value[1]
                let nextpage = action.payload
                let draftsCache = state.DraftsCache
                let firstslice = (<number>nextpage - 1) * 6
                let endslice = <number>nextpage * 6
                let draftslice = draftsCache.slice(firstslice,endslice)
                return of(new fromDraftAction.RetrieveCacheDrafts(draftslice))
            })
        )
    })

    checkCacheDraft = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromDraftAction.CHECK_CACHE_DRAFT),
            withLatestFrom(this.store.select("draft")),
            switchMap((value)=>{
                let action:fromDraftAction.CheckCacheDraft = value[0]
                let state = value[1]
                let DraftsCache = state.DraftsCache
                let ID = action.payload
                if (!DraftsCache){
                    return of(new fromDraftAction.GetNewDraft(ID))
                }else{
                    return of(new fromDraftAction.GetCacheDraft({ID:ID,DraftsCache:DraftsCache}))
                }
            })
        )
    })

    getNewDraft = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromDraftAction.GET_NEW_DRAFT),
            switchMap((action:fromDraftAction.GetNewDraft)=>{
                let ID = action.payload
                let payload = JSON.stringify({ID:ID})
                return this.http.post(`${environment.api}${environment.draftgetone}`,payload).pipe(
                    map((data)=>{
                        let draft = data["ArticleFromServer"]
                        return new fromDraftAction.RetrieveNewDraft(draft)
                    }),
                    catchError((err)=>{
                        return of(new fromDraftAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

    getCacheDraft = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromDraftAction.GET_CACHE_DRAFT),
            switchMap((action:fromDraftAction.GetCacheDraft)=>{
                let DraftsCache = action.payload.DraftsCache
                let ID = action.payload.ID
                let draftFound
                for (let i =0;i < DraftsCache.length;i++){
                    if (DraftsCache[i].ID == ID){
                        draftFound = DraftsCache[i]
                        break
                    }
                }
                if (draftFound){
                    return of(new fromDraftAction.RetrieveCacheDraft(draftFound))
                }else{
                    return of(new fromDraftAction.GetNewDraft(ID))
                }
            })
        )
    })

    deleteStart = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromDraftAction.DELETE_START),
            switchMap((action:fromDraftAction.DeleteStart)=>{
                let payload = JSON.stringify({ID:action.payload})
                return this.http.post(`${environment.api}${environment.draftdelete}`,payload).pipe(
                    map((data)=>{
                        return new fromDraftAction.DeleteOK(action.payload)
                    }),
                    catchError((err)=>{
                        return of(new fromDraftAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

}