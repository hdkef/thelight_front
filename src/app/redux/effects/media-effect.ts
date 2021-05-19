import { Store } from "@ngrx/store"
import { MediaPayload } from "src/app/models/media-payload"
import { environment } from "src/environments/environment"
import { AppState } from "../reducers/app-reducer"
import * as fromMediaAction from '../../redux/actions/media-action'
import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { switchMap, withLatestFrom } from "rxjs/operators"
import { of } from "rxjs"

@Injectable()
export class MediaEffect {

    constructor(private action$:Actions,private store:Store<AppState>){}

    ws:WebSocket
    Token:string

    tryPagingFromClient = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromMediaAction.TRY_PAGING_FROM_CLIENT),
            withLatestFrom(this.store.select("media")),
            switchMap((value)=>{
                console.log("tryPagingFromClient")
                let action:fromMediaAction.TryPagingFromClient = value[0]
                let state = value[1]

                if (state.Init){
                    return of(new fromMediaAction.PagingFromClient(action.payload))
                }else{
                    return of(new fromMediaAction.InitMediaWS())
                }
            })
        )
    })

    pagingFromClient = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromMediaAction.PAGING_FROM_CLIENT),
            withLatestFrom(this.store.select("auth")),
            switchMap((value)=>{
                console.log("pagingFromClient")
                let action:fromMediaAction.PagingFromClient = value[0]
                let state = value[1]
                let payload:MediaPayload = {
                    Type:"pagingFromClient",
                    ID:state.ID,
                    Token:this.Token,
                    Page:action.payload,
                }

                this.ws.send(JSON.stringify(payload))

                return of(new fromMediaAction.SendInfo("send paging from client..."))
            })
        )
    })


    initMediaWS = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromMediaAction.INIT_MEDIA_WS),
            withLatestFrom(this.store.select("auth")),
            switchMap((value)=>{
                console.log("initMediaWS")
                let state = value[1]
                let success = this.funcInitMediaWS(state.ID)
                if (success){
                    return of(new fromMediaAction.InitMediaWSOK())
                }else{
                    return of(new fromMediaAction.SendInfo("FAILED INITIATING WS"))
                }
            })
        )
    })


    funcInitMediaWS(ID:string){

        try {
            this.Token = localStorage.getItem("Bearer")

            this.ws = new WebSocket(`${environment.mediaws}`)

            this.ws.onopen = (event) => {
                let payload:MediaPayload = {
                    Type:"initFromClient",
                    ID:ID,
                    Token:this.Token,
                    Page:null,
                }
                this.ws.send(JSON.stringify(payload))
            }

            this.ws.onmessage = (event) => {
                let data = JSON.parse(event.data)
                console.log(data)
                let type = data["Type"]
                switch (type){
                    case "initFromServer":
                        this.store.dispatch(new fromMediaAction.InitFromServer(data["Medias"]))
                        break
                    case "pagingFromServer":
                        this.store.dispatch(new fromMediaAction.PagingFromServer(data["Medias"]))
                        break
                    case "mediaFromServer":
                        this.store.dispatch(new fromMediaAction.MediaFromServer(data["Media"]))
                        break
                }
            }

            return true
        } catch(err){
            return false
        }
        
    }
}