import { Article } from 'src/app/models/article';
import * as fromSearchAction from '../actions/search-action'


export interface State {
    Articles:Article[],
    ArticlesCache:Article[],
    Info:string,
    TotalPage:Number,
}

const initialState:State = {
    Articles:null,
    ArticlesCache:null,
    Info:"",
    TotalPage:0,
}

export function SearchReducer (
    state:State = initialState,
    action
){
    let tmparticlescache = state.ArticlesCache
    switch(action.type){
        case fromSearchAction.RETRIEVE_NEW:
            if (state.ArticlesCache){
                let newArticlesCache = tmparticlescache.concat(action.payload.Articles)
                return {...state,Articles:action.payload.Articles,ArticlesCache:newArticlesCache,TotalPage:action.payload.TotalPage}
            }else{
                return {...state,Articles:action.payload.Articles,ArticlesCache:action.payload.Articles,TotalPage:action.payload.TotalPage}
            }
        case fromSearchAction.RETRIEVE_CACHE:
            return {...state,Articles:action.payload}
        case fromSearchAction.CHECK_SEARCH_CACHE:
            return state
        case fromSearchAction.GET_NEW:
            return state
        case fromSearchAction.GET_CACHE:
            return state
        case fromSearchAction.DESTROY_INFO:
            return {...state,Info:""}
        case fromSearchAction.SEND_INFO:
            return {...state,Info:action.payload}
        case fromSearchAction.RESET:
            return initialState
        default:
            return state
    }
}