import * as fromAdmArticleAction from '../actions/adm-article-action'

export interface State {
    SavedID:Number
    Info:string,
}

const initialState:State = {
    SavedID:0,
    Info:"",
}

export function AdmArticleReducer (
    state:State = initialState,
    action
){
    switch(action.type){
        case fromAdmArticleAction.DESTROY_SAVEDID:
            return {...state,SavedID:0}
        case fromAdmArticleAction.SAVE_AS_OK:
            return {...state,SavedID:action.payload}
        case fromAdmArticleAction.EDIT_START:
            return state
        case fromAdmArticleAction.SAVE_AS_START:
            return state
        case fromAdmArticleAction.DESTROY_INFO:
            return {...state,Info:""}
        case fromAdmArticleAction.SAVE_START:
            return state
        case fromAdmArticleAction.PUBLISH_START:
            return state
        case fromAdmArticleAction.DELETE_START:
            return state
        case fromAdmArticleAction.SEND_INFO:
            return {...state,Info:action.payload}
        default:
            return state
    }
}