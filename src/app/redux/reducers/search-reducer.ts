import { Article } from 'src/app/models/article';
import * as fromSearchAction from '../actions/search-action'


export interface State {
    Articles:Article[],
    Info:string,
}

const initialState:State = {
    Articles:null,
    Info:"",
}

export function SearchReducer (
    state:State = initialState,
    action
){
    switch(action.type){
        case fromSearchAction.DESTROY_INFO:
            return {...state,Info:""}
        case fromSearchAction.SEARCH_ARTICLES_OK:
            return {...state,Articles:action.payload}
        case fromSearchAction.SEND_INFO:
            return {...state,Info:action.payload}
        case fromSearchAction.SEARCH_ARTICLES_START:
            return state
        default:
            return state
    }
}