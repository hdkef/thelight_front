import * as fromAuthAction from '../actions/auth-action'

export interface State {
    ID:string
    Name:string
    AvatarURL:string
    Bio:string
    Info:string
}

const initialState:State = {
    ID:"",
    Name:"",
    AvatarURL:"",
    Bio:"",
    Info:"",
}

export function AuthReducer(
    state:State = initialState,
    action,
){
    switch (action.type){
        case fromAuthAction.LOGIN_START:
            return state
        case fromAuthAction.SEND_INFO:
            return {...state,Info:action.payload}
        case fromAuthAction.LOGOUT_START:
            return initialState
        case fromAuthAction.AUTOLOGIN_START:
            return state
        case fromAuthAction.LOGIN_OK:
            return {
                ...state,
                ID:action.payload["ID"],
                Name:action.payload["Name"],
                AvatarURL:action.payload["AvatarURL"],
                Bio:action.payload["Bio"],
            }
        default:
            return state
    }
}