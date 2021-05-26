import { Article } from 'src/app/models/article';
import * as fromSearchAction from '../actions/search-action'


export interface State {
    Articles:Article[],
    Info:string,
    TotalPage:Number,
}

const initialState:State = {
    Articles:null,
    Info:"",
    TotalPage:0,
}

export function SearchReducer (
    state:State = initialState,
    action
){
    let oldTotalPage = state.TotalPage
    switch(action.type){
        case fromSearchAction.DESTROY_INFO:
            return {...state,Info:""}
        case fromSearchAction.SEARCH_ARTICLES_OK:
            if (action.payload.Page > oldTotalPage){
                return {...state,TotalPage:action.payload.Page,Articles:action.payload.Articles}
            }else{
                return {...state,Articles:action.payload.Articles}
            }
        case fromSearchAction.SEND_INFO:
            return {...state,Info:action.payload}
        case fromSearchAction.SEARCH_ARTICLES_START:
            return state
        case fromSearchAction.RESET:
            return initialState
        default:
            return state
    }
}