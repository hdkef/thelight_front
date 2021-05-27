import { Action } from "@ngrx/store"
import { Article } from "src/app/models/article"


export const SEND_INFO = "Search Articles Send Info"
export const DESTROY_INFO = "Search Articles Destroy Info"
export const RESET = "Search Articles Reset"

export const CHECK_SEARCH_CACHE = "Search Check Cache"
export const GET_NEW = "Search Get New"
export const GET_CACHE = "Search Get Cache"
export const RETRIEVE_NEW = "Search Retrieve New"
export const RETRIEVE_CACHE = "Search Retrieve Cache"

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