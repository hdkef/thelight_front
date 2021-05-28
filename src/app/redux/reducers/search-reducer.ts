import { Article } from 'src/app/models/article';
import * as fromSearchAction from '../actions/search-action'


export interface State {
    Article:Article,
    Articles:Article[],
    ArticlesCache:Article[],
    Info:string,
    TotalPage:Number,
}

const initialState:State = {
    Article:null,
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
        case fromSearchAction.CHECK_ARTICLE_CACHE:
            return state
        case fromSearchAction.GET_NEW_ARTICLE:
            return state
        case fromSearchAction.GET_CACHE_ARTICLE:
            return state
        case fromSearchAction.RETRIEVE_CACHE_ARTICLE:
            return {...state,Article:action.payload}
        case fromSearchAction.RETRIEVE_NEW_ARTICLE:
            return {...state,Article:action.payload}
        case fromSearchAction.RETRIEVE_NEW:
            if (tmparticlescache){
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