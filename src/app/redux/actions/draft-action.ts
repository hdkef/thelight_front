import { Action } from "@ngrx/store";
import { Article } from "src/app/models/article";

export const CHECK_CACHE_DRAFTS = "Draft Check Cache Drafts"
export const GET_NEW_DRAFTS = "Draft Get New Drafts"
export const GET_CACHE_DRAFTS = "Draft Get Cache Drafts"
export const RETRIEVE_NEW_DRAFTS = "Draft Retrieve New Drafts"
export const RETRIEVE_CACHE_DRAFTS = "Draft Retrieve Cache Drafts"
export const CHECK_CACHE_DRAFT = "Draft Check Cache Draft"
export const GET_NEW_DRAFT = "Draft Get New Draft"
export const GET_CACHE_DRAFT = "Draft Get Cache Draft"
export const RETRIEVE_NEW_DRAFT = "Draft Retrieve New Draft"
export const RETRIEVE_CACHE_DRAFT = "Draft Retrieve Cache Draft"
export const SEND_INFO = "Draft Send Info"
export const DESTROY_INFO = "Draft Destroy Info"
export const DESTROY_DRAFT = "Draft Destroy Draft"

export class DestroyDraft implements Action {
    type:string = DESTROY_DRAFT

    constructor(){}
}

export class DestroyInfo implements Action {
    type:string = DESTROY_INFO

    constructor(){}
}

export class SendInfo implements Action {
    type:string = SEND_INFO

    constructor(public payload:string){}
}

export class CheckCacheDrafts implements Action {
    type:string = CHECK_CACHE_DRAFTS

    constructor(public payload:Number){}
}

export class GetNewDrafts implements Action {
    type:string = GET_NEW_DRAFTS

    constructor(public payload:Number){}
}

export class GetCacheDrafts implements Action {
    type:string = GET_CACHE_DRAFTS

    constructor(public payload:Number){}
}

export class RetrieveNewDrafts implements Action {
    type:string = RETRIEVE_NEW_DRAFTS

    constructor(public payload:{TotalPage:Number,Drafts:Article[]}){}
}

export class RetrieveCacheDrafts implements Action {
    type:string = RETRIEVE_CACHE_DRAFTS

    constructor(public payload:Article[]){}
}

export class CheckCacheDraft implements Action {
    type:string = CHECK_CACHE_DRAFT

    constructor(public payload:Number){}
}

export class GetNewDraft implements Action {
    type:string = GET_NEW_DRAFT

    constructor(public payload:Number){}
}

export class GetCacheDraft implements Action {
    type:string = GET_CACHE_DRAFT

    constructor(public payload:{ID:Number,DraftsCache:Article[]}){}
}

export class RetrieveNewDraft implements Action {
    type:string = RETRIEVE_NEW_DRAFT

    constructor(public payload:Article){}
}

export class RetrieveCacheDraft implements Action {
    type:string = RETRIEVE_CACHE_DRAFT

    constructor(public payload:Article){}
}