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
    Articles:null,
    Article:null,
    Info:"",
    ArticlesCache:null,
}

export function ArticleReducer(
    state:State = initialState,
    action,
){
    switch(action.type){
        case fromArticleAction.DELETE_ONE:
            let tmpArticlesCache = state.ArticlesCache
            let nwArticlesCache = tmpArticlesCache.filter((article)=>{return article.ID != action.payload})
            let tmpArticles = state.Articles
            let nwArticles = tmpArticles.filter((article)=>{return article.ID != action.payload})
            return {...state,Articles:nwArticles,ArticlesCache:nwArticlesCache}
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
        case fromArticleAction.RETRIEVE_NEW_ARTICLE:
            return {...state,Article:action.payload}
        case fromArticleAction.RETRIEVE_NEW_ARTICLES:
            if (state.ArticlesCache){
                let oldArticlesCache = state.ArticlesCache
                let newArticlesCache = oldArticlesCache.concat(action.payload.Articles)
                return {...state,Articles:action.payload.Articles,ArticlesCache:newArticlesCache,TotalPage:action.payload.TotalPage}
            }else{
                return {...state,Articles:action.payload.Articles,ArticlesCache:action.payload.Articles,TotalPage:action.payload.TotalPage}
            }
        case fromArticleAction.RETRIEVE_CACHE_ARTICLES:
            return {...state,Articles:action.payload}
        case fromArticleAction.RETRIEVE_CACHE_ARTICLE:
            return {...state,Article:action.payload}
        case fromArticleAction.DESTROY_ARTICLE:
            return {...state,Article:null,Info:""}
        case fromArticleAction.DESTROY_INFO:
            return {...state,Info:""}
        case fromArticleAction.SEND_INFO:
            return {...state,Info:action.payload}
        default:
            return state
    }
}