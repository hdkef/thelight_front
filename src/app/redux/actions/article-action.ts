import { Action } from "@ngrx/store"
import { Article } from "src/app/models/article"

export const CHECK_ARTICLES_CACHE = "Article Check Articles Cache"
export const CHECK_ARTICLE_CACHE = "Article Check Article Cache"
export const RETRIEVE_CACHE_ARTICLES = "Article Retrieve Cache Articles"
export const RETRIEVE_CACHE_ARTICLE = "Article Retrieve Cache Article"
export const GET_CACHE_ARTICLES = "Article Get Cache Articles"
export const GET_NEW_ARTICLES = "Article Get New Articles"
export const GET_NEW_ARTICLE = "Article Get New Article"
export const RETRIEVE_NEW_ARTICLES = "Article Retrieve New Articles"
export const RETRIEVE_NEW_ARTICLE = "Article Retrieve New Article"
export const DESTROY_ARTICLE = "Article Destroy Article"
export const SEND_INFO = "Article Send Info"

export class CheckArticlesCache implements Action{
    type: string = CHECK_ARTICLES_CACHE
    constructor(public payload:Number){}
}

export class CheckArticleCache implements Action{
    type: string = CHECK_ARTICLE_CACHE
    constructor(public payload:string){}
}

export class RetrieveCacheArticles implements Action{
    type: string = RETRIEVE_CACHE_ARTICLES
    constructor(public payload:Article[]){}
}

export class RetrieveCacheArticle implements Action{
    type: string = RETRIEVE_CACHE_ARTICLE
    constructor(public payload:Article){}
}

export class GetNewArticles implements Action{
    type: string = GET_NEW_ARTICLES
    constructor(public payload:Number){}
}

export class GetCacheArticles implements Action{
    type: string = GET_CACHE_ARTICLES
    constructor(public payload:Number){}
}

export class GetNewArticle implements Action{
    type: string = GET_NEW_ARTICLE
    constructor(public payload:string){}
}

export class RetrieveNewArticles implements Action{
    type: string = RETRIEVE_NEW_ARTICLES
    constructor(public payload:{Articles:Article[],TotalPage:Number}){}
}

export class RetrieveNewArticle implements Action{
    type: string = RETRIEVE_NEW_ARTICLE
    constructor(public payload:Article){}
}

export class DestroyArticle implements Action{
    type: string = DESTROY_ARTICLE
    constructor(){}
}

export class SendInfo implements Action{
    type: string = SEND_INFO
    constructor(public payload:string){}
}