import { Comment } from 'src/app/models/comment';
import * as fromCommentAction from '../actions/comment-action'


export interface State {
    Comments:Comment[]
    Info:string
}

const initialState:State = {
    Comments:null,
    Info:"",
}

export function CommentReducer (
    state:State = initialState,
    action,
){
    switch (action.type){
        case fromCommentAction.GET_COMMENTS:
            return state
        case fromCommentAction.RETRIEVE_COMMENTS:
            return {...state,Comments:action.payload}
        case fromCommentAction.INSERT_COMMENT:
            return state
        case fromCommentAction.DESTROY_COMMENT:
            return {...state,Comments:null}
        case fromCommentAction.SEND_INFO:
            return {...state,Info:action.payload}
        default:
            return state
    }
}