import { Action } from "@ngrx/store"
import { Article } from "src/app/models/article"


export const SEND_INFO = "Search Articles Send Info"
export const DESTROY_INFO = "Search Articles Destroy Info"
export const RESET = "Search Articles Reset"
export const CHECK_ARTICLE_CACHE = "Search Check Article Cache"
export const GET_NEW_ARTICLE = "Search Get New Article"
export const GET_CACHE_ARTICLE = "Search Get Cache Article"
export const RETRIEVE_NEW_ARTICLE = "Search Retrieve New Article"
export const RETRIEVE_CACHE_ARTICLE = "Search Retrieve Cache Article"
export const CHECK_SEARCH_CACHE = "Search Check Cache"
export const GET_NEW = "Search Get New"
export const GET_CACHE = "Search Get Cache"
export const RETRIEVE_NEW = "Search Retrieve New"
export const RETRIEVE_CACHE = "Search Retrieve Cache"
export const DESTROY_ARTICLE = "Search Destroy Articles"

export class DestroyArticle implements Action {
    type:string = DESTROY_ARTICLE
    constructor(){}
}

export class CheckArticleCache implements Action {
    type:string = CHECK_ARTICLE_CACHE
    constructor(public payload:Number){}
}

export class GetNewArticle implements Action {
    type:string = GET_NEW_ARTICLE
    constructor(public payload:Number){}
}

export class GetCacheArticle implements Action {
    type:string = GET_CACHE_ARTICLE
    constructor(public payload:{ID:Number,ArticlesCache:Article[]}){}
}

export class RetrieveNewArticle implements Action {
    type:string = RETRIEVE_NEW_ARTICLE
    constructor(public payload:Article){}
}

export class RetrieveCacheArticle implements Action {
    type:string = RETRIEVE_CACHE_ARTICLE
    constructor(public payload:Article){}
}

export class CheckSearchCache implements Action {
    type:string = CHECK_SEARCH_CACHE
    constructor(public payload:{Page:Number, Key:string,Filter:string}){}
}

export class GetNew implements Action {
    type:string = GET_NEW
    constructor(public payload:{Page:Number, Key:string,Filter:string}){}
}

export class GetCache implements Action {
    type:string = GET_CACHE
    constructor(public payload:Number){}
}

export class RetrieveNew implements Action {
    type:string = RETRIEVE_NEW
    constructor(public payload:{Articles:Article[],TotalPage:Number}){}
}

export class RetrieveCache implements Action {
    type:string = RETRIEVE_CACHE
    constructor(public payload:Article[]){}
}

export class SendInfo implements Action {
    type: string = SEND_INFO
    constructor(public payload:string){}
}

export class DestroyInfo implements Action {
    type: string = DESTROY_INFO
    constructor(){}
}

export class SearchReset implements Action {
    type: string = RESET
    constructor(){}
}