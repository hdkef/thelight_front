import { Article } from "src/app/models/article";
import * as fromArticleAction from '../actions/article-action'

export interface State {
    TotalPage:Number,
    Articles:Article[],
    Article:Article,
    Info:string,
    ArticlesCache:Article[],
}

const initialState:State = {
    TotalPage:0,
    Articles:[],
    Article:null,
    Info:"",
    ArticlesCache:[],
}

export function ArticleReducer(
    state = initialState,
    action,
){
    switch(action.type){
        case fromArticleAction.CHECK_ARTICLES_CACHE:
            return state
        case fromArticleAction.CHECK_ARTICLE_CACHE:
            return state
        case fromArticleAction.GET_NEW_ARTICLE:
            return state
        case fromArticleAction.GET_NEW_ARTICLES:
            return state
        case fromArticleAction.GET_CACHE_ARTICLES:
            return state
        case fromArticleAction.GET_CACHE_ARTICLE:
            return state
        case fromArticleAction.RETRIEVE_NEW_ARTICLES:
            let oldArticlesCache = state.ArticlesCache
            let newArticlesCache = oldArticlesCache.concat(action.payload.Articles)
            return {...state,Articles:action.payload.Articles,ArticlesCache:newArticlesCache,TotalPage:action.payload.TotalPage}
        case fromArticleAction.RETRIEVE_CACHE_ARTICLES:
            return {...state,Articles:action.payload}
        case fromArticleAction.RETRIEVE_CACHE_ARTICLE:
            return {...state,Article:action.payload}
        case fromArticleAction.DESTROY_ARTICLE:
            return {...state,Article:null}
        case fromArticleAction.SEND_INFO:
            return {...state,Info:action.payload}
        default:
            return state
    }
}