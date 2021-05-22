import { Media } from 'src/app/models/media';
import * as fromMediaAction from '../actions/media-action'

export interface State{
    Medias:Media[],
    Info:string,
    Init:boolean,
}

const initialState:State = {
    Medias:null,
    Info:"",
    Init:false,
}

export function MediaReducer (
    state:State = initialState,
    action,
){
    switch(action.type){
        case fromMediaAction.INIT_MEDIA_WS:
            return state
        case fromMediaAction.MEDIA_FROM_CLIENT:
            return state
        case fromMediaAction.INIT_FROM_SERVER:
            console.log("init from server", action.payload)
            return {...state,Medias:action.payload}
        case fromMediaAction.INIT_MEDIA_WS_OK:
            return {...state,Init:true,Info:"WEBSOCKET HAS BEEN INITIATED"}
        case fromMediaAction.PAGING_FROM_SERVER:
            console.log("paging from server", action.payload)
            return {...state,Medias:action.payload}
        case fromMediaAction.MEDIA_FROM_SERVER: //TOBEIMPLEMENTED
            console.log("media from server", action.payload)
            let tmp = [action.payload, ...state.Medias]
            tmp.pop()
            return {...state,Medias:tmp}
        case fromMediaAction.DESTROY_MEDIAS:
            return {...state,Medias:null, Init:false,Info:""}
        case fromMediaAction.DESTROY_INFO:
            return {...state,Info:""}
        default:
            return state
    }
}