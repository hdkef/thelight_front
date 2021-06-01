import { Article } from "src/app/models/article";
import * as fromDraftAction from '../actions/draft-action'

export interface State {
    Drafts:Article[],
    DraftsCache:Article[],
    Draft:Article,
    TotalPage:Number,
    Info:string,
}

const initialState:State = {
    Drafts:null,
    DraftsCache:null,
    Draft:null,
    TotalPage:0,
    Info:"",
}

export function DraftReducer (
    state:State = initialState,
    action
){
    let tmpdraftscache = state.DraftsCache
    let tmpdrafts = state.Drafts
    switch(action.type){
        case fromDraftAction.DELETE_OK:
            if (!tmpdrafts || !tmpdraftscache){
                return state
            }
            let tmp1 = [...tmpdrafts]
            let tmp2 = [...tmpdraftscache]
            for (let i=0;i < tmp1.length;i++){
                if (tmp1[i].ID == action.payload){
                    tmp1[i] = null
                    break
                }
            }
            for (let i=0;i < tmp2.length;i++){
                if (tmp2[i].ID == action.payload){
                    tmp2[i] = null
                    break
                }
            }
            return {...state,Drafts:tmp1,DraftsCache:tmp2}
        case fromDraftAction.DELETE_START:
            return state
        case fromDraftAction.DESTROY_DRAFT:
            return {...state,Draft:null}
        case fromDraftAction.RETRIEVE_CACHE_DRAFT:
            return {...state,Draft:action.payload}
        case fromDraftAction.RETRIEVE_NEW_DRAFT:
            return {...state,Draft:action.payload}
        case fromDraftAction.RETRIEVE_CACHE_DRAFTS:
            return {...state,Drafts:action.payload}
        case fromDraftAction.RETRIEVE_NEW_DRAFTS:
            if (tmpdraftscache){
                let newDraftsCache = tmpdraftscache.concat(action.payload.Drafts)
                return {...state,DraftsCache:newDraftsCache,Drafts:action.payload.Drafts,TotalPage:action.payload.TotalPage}
            }else{
                return {...state,DraftsCache:action.payload.Drafts,Drafts:action.payload.Drafts,TotalPage:action.payload.TotalPage}
            }
        case fromDraftAction.GET_NEW_DRAFTS:
            return state
        case fromDraftAction.GET_NEW_DRAFT:
            return state
        case fromDraftAction.GET_CACHE_DRAFTS:
            return state
        case fromDraftAction.GET_CACHE_DRAFT:
            return state
        case fromDraftAction.CHECK_CACHE_DRAFT:
            return state
        case fromDraftAction.CHECK_CACHE_DRAFTS:
            return state
        default:
            return state
    }
}