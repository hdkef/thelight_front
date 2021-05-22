import { Action } from "@ngrx/store"
import { Comment } from "src/app/models/comment"

export const GET_COMMENTS = "Comment Get Comments"
export const RETRIEVE_COMMENTS = "Comment Retrieve Comments"
export const INSERT_COMMENT = "Comment Insert Comment"
export const DESTROY_COMMENT = "Comment Destroy Comment"
export const SEND_INFO = "Comment Send Info"
export const DESTROY_INFO = "Comment Destroy Info"

export class DestroyInfo implements Action{
    type:string = DESTROY_INFO
}

export class GetComments implements Action{
    type: string = GET_COMMENTS

    constructor(public payload:string){}
}

export class RetrieveComments implements Action{
    type: string = RETRIEVE_COMMENTS

    constructor(public payload:Comment[]){}
}

export class InsertComment implements Action{
    type: string = INSERT_COMMENT

    constructor(public payload:{ID:string,Comment:Comment}){}
}

export class DestroyComments implements Action{
    type: string = DESTROY_COMMENT

    constructor(){}
}

export class SendInfo implements Action{
    type: string = SEND_INFO

    constructor(public payload:string){}
}