import { Action } from "@ngrx/store"
import { Article } from "src/app/models/article"

export const PUBLISH_START = "Adm Article Publish Start"
export const SAVE_START = "Adm Article Save Start"
export const DELETE_START = "Adm Article Delete Start"
export const EDIT_START = "Adm Article Edit Start"
export const SEND_INFO = "Adm Article Send Info"
export const DESTROY_INFO = "Adm Article Destroy Info"

export class EditStart implements Action {
    
    type: string= EDIT_START

    constructor(public payload:Article){}
}

export class PublishStart implements Action {
    
    type: string= PUBLISH_START

    constructor(public payload:Article){}
}

export class SaveStart implements Action {
    
    type: string= SAVE_START

    constructor(public payload:Article){}

}

export class DeleteStart implements Action {
    
    type: string= DELETE_START

    constructor(public payload:string){}

}

export class SendInfo implements Action {
    type: string = SEND_INFO

    constructor(public payload:string){}

}

export class DestroyInfo implements Action {
    type: string = DESTROY_INFO

    constructor(){}

}