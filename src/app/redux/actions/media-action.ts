import { Action } from "@ngrx/store"
import { Media } from "src/app/models/media"

export const INIT_MEDIA_WS = "Media Init Media WS"
export const INIT_MEDIA_WS_OK = "Media Init Media WS OK"
export const INIT_FROM_SERVER = "Media  Init From Server"
export const PAGING_FROM_SERVER = "Media Paging From Server"
export const TRY_PAGING_FROM_CLIENT = "Media Try Paging From Client"
export const PAGING_FROM_CLIENT = "Media Paging From Client"
export const MEDIA_FROM_SERVER = "Media Media From Server"
export const DESTROY_MEDIAS = "Media Destroy Medias"
export const SEND_INFO = "Media Send Info"

export class TryPagingFromClient implements Action{
    type: string = TRY_PAGING_FROM_CLIENT

    constructor(public payload:Number){}
}

export class PagingFromClient implements Action{
    type: string = PAGING_FROM_CLIENT

    constructor(public payload:Number){}
}

export class InitMediaWS implements Action{
    type: string = INIT_MEDIA_WS

    constructor(){}
}

export class InitFromServer implements Action{
    type: string = INIT_FROM_SERVER

    constructor(public payload:Media[]){}
}

export class PagingFromServer implements Action{
    type: string = PAGING_FROM_SERVER

    constructor(public payload:Media[]){}
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

export class InitMediaWSOK implements Action{
    type: string = INIT_MEDIA_WS_OK

    constructor(){}
}