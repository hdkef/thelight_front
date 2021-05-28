import { Store } from "@ngrx/store"
import { MediaPayload } from "src/app/models/media-payload"
import { environment } from "src/environments/environment"
import { AppState } from "../reducers/app-reducer"
import * as fromMediaAction from '../../redux/actions/media-action'
import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators"
import { of } from "rxjs"
import { HttpClient } from "@angular/common/http"

@Injectable()
export class MediaEffect {

    constructor(private action$:Actions,private store:Store<AppState>, private http:HttpClient){}

    ws:WebSocket
    Token:string
    ID:Number

    tryPaging = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromMediaAction.TRY_PAGING),
            withLatestFrom(this.store.select("media")),
            switchMap((value)=>{
                console.log("tryPaging")
                let action:fromMediaAction.TryPaging = value[0]
                let state = value[1]

                if (state.Init){
                    return of(new fromMediaAction.CheckCache(action.payload))
                }else{
                    return of(new fromMediaAction.InitWS())
                }
            })
        )
    })

    initWS = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromMediaAction.INIT_WS),
            withLatestFrom(this.store.select("auth")),
            switchMap((value)=>{
                console.log("initWS")
                let state = value[1]
                let success = this.funcInitMediaWS(state.ID)
                if (success){
                    return of(new fromMediaAction.InitWSOK())
                }else{
                    return of(new fromMediaAction.SendInfo("FAILED INITIATING WS"))
                }
            })
        )
    })

    checkCache = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromMediaAction.CHECK_CACHE),
            withLatestFrom(this.store.select("media")),
            switchMap((value)=>{
                console.log("checkcache")
                let action:fromMediaAction.CheckCache = value[0]
                let state = value[1]
                let totalpage = state.TotalPage
                let nextpage = action.payload
                if (nextpage > totalpage){
                    return of(new fromMediaAction.GetNew(nextpage))
                }else{
                    return of(new fromMediaAction.GetCache(nextpage))
                }
            })
        )
    })

    getCache = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromMediaAction.GET_CACHE),
            withLatestFrom(this.store.select("media")),
            switchMap((value)=>{
                console.log("getcache")
                let action:fromMediaAction.CheckCache = value[0]
                let state = value[1]
                let MediasCache = state.MediasCache
                let nextpage = action.payload
                let firstslice = (<number>nextpage - 1) * 6
                let endslice = <number>nextpage * 6
                let mediasFromCache = MediasCache.slice(firstslice,endslice)
                return of(new fromMediaAction.RetrieveCache(mediasFromCache))
            })
        )
    })

    getNew = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromMediaAction.GET_NEW),
            withLatestFrom(this.store.select("media")),
            switchMap((value)=>{
                console.log("getnew")
                let action:fromMediaAction.CheckCache = value[0]
                let state = value[1]
                let MediasCache = state.MediasCache
                let Page = action.payload
                if (!MediasCache){
                    return this.PagingByID(0,Page)
                }else{
                    let LastID = MediasCache[state.MediasCache.length-1].ID
                    return this.PagingByID(LastID,Page)
                }
            })
        )
    })

    PagingByID(LastID:Number,Page:Number){
        console.log("pagingbyID")
        let payload:MediaPayload = {
            Type:"pagingFromClient",
            ID:this.ID,
            Token:this.Token,
            Page:Page,
            LastID:LastID,
        }
        this.ws.send(JSON.stringify(payload)) 
        return of(new fromMediaAction.SendInfo("send pagingfromclient..."))
    }

    mediaFromClient = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromMediaAction.MEDIA_FROM_CLIENT),
            withLatestFrom(this.store.select("auth")),
            switchMap((value)=>{
                let action:fromMediaAction.MediaFromClient= value[0]
                let state = value[1]

                let payload = new FormData()
                let filename = state.ID + new Date().toISOString()
                payload.append('Image',action.payload,filename)

                return this.http.post(`${environment.api}${environment.mediaupload}`,payload).pipe(
                    map((data)=>{
                        let msg = data["MSG"]
                        return new fromMediaAction.SendInfo(msg)
                    }),
                    catchError((err)=>{
                        return of(new fromMediaAction.SendInfo(err.error))
                    })
                )
            })
        )
    })


    funcInitMediaWS(ID:Number){

        try {
            this.Token = localStorage.getItem("Bearer")
            this.ID = ID

            this.ws = new WebSocket(`${environment.mediaws}`)

            this.ws.onopen = (event) => {
                let payload:MediaPayload = {
                    Type:"initFromClient",
                    ID:ID,
                    Token:this.Token,
                    Page:1,
                    LastID:0,
                }
                this.ws.send(JSON.stringify(payload))
            }

            this.ws.onmessage = (event) => {
                let data = JSON.parse(event.data)
                let type = data["Type"]
                let medias = data["Medias"]
                let page = data["Page"]
                let media = data["Media"]
                switch (type){
                    case "pagingFromServer":
                        console.log("pagingFromServer ", medias)
                        this.store.dispatch(new fromMediaAction.RetrieveNew({TotalPage:page,Medias:medias}))
                        break
                    case "mediaFromServer":
                        this.store.dispatch(new fromMediaAction.MediaFromServer(media))
                        break
                }
            }

            return true
        } catch(err){
            return false
        }
        
    }
}