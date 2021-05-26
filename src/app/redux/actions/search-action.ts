import { Action } from "@ngrx/store"
import { Article } from "src/app/models/article"

export const SEARCH_ARTICLES_START = "Search Articles Start"
export const SEARCH_ARTICLES_OK = "Search Articles OK"
export const SEND_INFO = "Search Articles Send Info"
export const DESTROY_INFO = "Search Articles Destroy Info"
export const RESET = "Search Articles Reset"

export class SearchReset implements Action {
    type: string = RESET
    constructor(){}
}

export class SearchArticlesStart implements Action {
    type: string = SEARCH_ARTICLES_START
    constructor(public payload:{Page:Number,Key:string,Filter:string}){}
}

export class SearchArticlesOK implements Action {
    type: string = SEARCH_ARTICLES_OK
    constructor(public payload:{Page:Number,Articles:Article[]}){}
}

export class SendInfo implements Action {
    type: string = SEND_INFO
    constructor(public payload:string){}
}

export class DestroyInfo implements Action {
    type: string = DESTROY_INFO
    constructor(){}
}