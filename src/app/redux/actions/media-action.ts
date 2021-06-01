import { Action } from "@ngrx/store"
import { Media } from "src/app/models/media"

export const MEDIA_FROM_SERVER = "Media Media From Server"
export const MEDIA_FROM_CLIENT = "Media Media From Client"
export const DESTROY_MEDIAS = "Media Destroy Medias"
export const SEND_INFO = "Media Send Info"
export const DESTROY_INFO = "Media Destroy Info"
export const INIT_WS = "Media Init WS"
export const INIT_WS_OK = "Media Init WS OK"
export const TRY_PAGING = "Media Try Paging"
export const CHECK_CACHE = "Media Check Cache"
export const RETRIEVE_NEW = "Media Retrieve New"
export const RETRIEVE_CACHE = "Media Retrieve Cache"
export const GET_NEW = "Media Get New"
export const GET_CACHE = "Media Get Cache"
export const DELETE_START = "Media Delete Start"
export const DELETE_OK = "Media Delete OK"

export class DeleteOK implements Action {
    type: string = DELETE_OK
    constructor(public payload:Number){}
}

export class DeleteStart implements Action {
    type: string = DELETE_START
    constructor(public payload:Number){}
}

export class InitWS implements Action {
    type: string = INIT_WS
    constructor(){}
}

export class InitWSOK implements Action {
    type: string = INIT_WS_OK
    constructor(){}
}

export class TryPaging implements Action {
    type: string = TRY_PAGING
    constructor(public payload:Number){}
}

export class CheckCache implements Action {
    type: string = CHECK_CACHE
    constructor(public payload:Number){}
}

export class GetNew implements Action {
    type: string = GET_NEW
    constructor(public payload:Number){}
}

export class GetCache implements Action {
    type : string = GET_CACHE
    constructor(public payload:Number){}
}

export class RetrieveNew implements Action {
    type : string = RETRIEVE_NEW
    constructor(public payload:{TotalPage:Number,Medias:Media[]}){}
}

export class RetrieveCache implements Action {
    type : string = RETRIEVE_CACHE
    constructor(public payload:Media[]){}
}

export class DestroyInfo implements Action{
    type:string = DESTROY_INFO
}

export class MediaFromClient implements Action{
    type:string = MEDIA_FROM_CLIENT

    constructor(public payload:File){}
}

export class MediaFromServer implements Action{
    type: string = MEDIA_FROM_SERVER

    constructor(public payload:Media){}
}

export class DestroyMedias implements Action{
    type: string = DESTROY_MEDIAS

    constructor(){}
}

export class SendInfo implements Action{
    type: string = SEND_INFO

    constructor(public payload:string){}
}