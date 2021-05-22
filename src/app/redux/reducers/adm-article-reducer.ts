import * as fromAdmArticleAction from '../actions/adm-article-action'

export interface State {
    Info:string,
}

const initialState:State = {
    Info:"",
}

export function AdmArticleReducer (
    state:State = initialState,
    action
){
    switch(action.type){
        case fromAdmArticleAction.EDIT_START:
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
    }
}