import { Media } from 'src/app/models/media';
import * as fromMediaAction from '../actions/media-action'

export interface State{
    Medias:Media[],
    MediasCache:Media[],
    Info:string,
    Init:boolean,
    TotalPage:Number,
}

const initialState:State = {
    Medias:null,
    MediasCache:null,
    Info:"",
    Init:false,
    TotalPage:0,
}

export function MediaReducer (
    state:State = initialState,
    action,
){
    let oldmediasCache = state.MediasCache
    let oldmedias = state.Medias
    switch(action.type){
        case fromMediaAction.MEDIA_FROM_CLIENT:
            return state
        case fromMediaAction.INIT_WS_OK:
            return {...state,Init:true}
        case fromMediaAction.RETRIEVE_NEW:
            console.log("RETRIEVE_NEW ", action.payload)
            if (oldmediasCache){
                let newMediasCache = oldmediasCache.concat(action.payload.Medias)
                return {...state,Medias:action.payload.Medias,MediasCache:newMediasCache,TotalPage:action.payload.TotalPage}
            }else{
                return {...state,Medias:action.payload.Medias,MediasCache:action.payload.Medias,TotalPage:action.payload.TotalPage}
            }
        case fromMediaAction.RETRIEVE_CACHE:
            return {...state,Medias:action.payload}
        case fromMediaAction.MEDIA_FROM_SERVER:
            if (!oldmediasCache || !oldmedias){
                return {...state,Medias:[action.payload],MediasCache:[action.payload]}
            }
            let tmp1 = [action.payload, ...oldmedias]
            let tmp2 = [action.payload,...oldmediasCache]
            tmp1.pop()
            tmp2.pop()
            return {...state,Medias:tmp1,MediasCache:tmp2}
        case fromMediaAction.DESTROY_MEDIAS:
            return {...state,Medias:null, Init:false,Info:""}
        case fromMediaAction.DESTROY_INFO:
            return {...state,Info:""}
        default:
            return state
    }
}