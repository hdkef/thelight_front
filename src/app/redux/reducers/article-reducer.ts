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
        // case fromArticleAction.DELETE_ONE:
        //     let tmpArticlesCache = state.ArticlesCache
        //     let nwArticlesCache = tmpArticlesCache.filter((article)=>{return article.ID != action.payload})
        //     let tmpArticles = state.Articles
        //     let nwArticles = tmpArticles.filter((article)=>{return article.ID != action.payload})
        //     return {...state,Articles:nwArticles,ArticlesCache:nwArticlesCache}
        case fromArticleAction.DELETE_ONE:
            let tmparticles = state.Articles
            let tmparticlescache = state.ArticlesCache
            for (let i = 0;i < tmparticles.length;i++){
                if (tmparticles[i].ID == action.payload){
                    tmparticles[i] = null
                    break
                }
            }
            for (let i = 0;i < tmparticlescache.length;i++){
                if (tmparticlescache[i].ID == action.payload){
                    tmparticlescache[i] = null
                    break
                }
            }
            return {...state,Articles:tmparticles,ArticlesCache:tmparticlescache}
        case fromArticleAction.UPDATE_ONE:
            let tmparticles2 = state.Articles
            let tmparticlescache2 = state.ArticlesCache
            for (let i = 0;i < tmparticles2.length;i++){
                if (tmparticles2[i].ID == action.payload.ID){
                    tmparticles2[i] = action.payload
                    break
                }
            }
            for (let i = 0;i < tmparticlescache2.length;i++){
                if (tmparticlescache2[i].ID == action.payload.ID){
                    tmparticlescache2[i] = action.payload
                    break
                }
            }
            return {...state,Articles:tmparticles2,ArticlesCache:tmparticlescache2}
        case fromArticleAction.INSERT_ONE:
            let tmparticles3 = [action.payload,...state.Articles]
            let tmparticlescache3 = [action.payload,...state.ArticlesCache]
            tmparticles3.pop()
            tmparticlescache3.pop()
            return {...state,Articles:tmparticles3,ArticlesCache:tmparticlescache3}
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