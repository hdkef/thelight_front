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
    let tmparticles = state.Articles
    let tmparticlescache = state.ArticlesCache
    switch(action.type){
        case fromArticleAction.DELETE_ONE:
            if (!tmparticles || !tmparticlescache){
                return state
            }
            let tmp13 = [...tmparticles]
            let tmp23 = [...tmparticlescache]
            for (let i = 0;i < tmp13.length;i++){
                if (tmp13[i].ID == action.payload){
                    tmp13[i] = null
                    break
                }
            }
            for (let i = 0;i < tmp23.length;i++){
                if (tmp23[i].ID == action.payload){
                    tmp23[i] = null
                    break
                }
            }
            return {...state,Articles:tmp13,ArticlesCache:tmp23}
        case fromArticleAction.UPDATE_ONE:
            if (!tmparticles || !tmparticlescache){
                return state
            }
            let tmp11 = [...tmparticles]
            let tmp22 = [...tmparticlescache]
            for (let i = 0;i < tmp11.length;i++){
                if (tmp11[i].ID == action.payload.ID){
                    tmp11[i] = action.payload
                    break
                }
            }
            for (let i = 0;i < tmp22.length;i++){
                if (tmp22[i].ID == action.payload.ID){
                    tmp22[i] = action.payload
                    break
                }
            }
            return {...state,Articles:tmp11,ArticlesCache:tmp22}
        case fromArticleAction.INSERT_ONE:
            if (!tmparticles || !tmparticlescache){
                return state
            }
            let tmp1 = [action.payload,...tmparticles]
            let tmp2 = [action.payload,...tmparticlescache]
            tmp1.pop()
            tmp2.pop()
            return {...state,Articles:tmp1,ArticlesCache:tmp2}
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
                let newArticlesCache = tmparticlescache.concat(action.payload.Articles)
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