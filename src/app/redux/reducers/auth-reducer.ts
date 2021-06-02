import * as fromAuthAction from '../actions/auth-action'

export interface State {
    ID:Number,
    Name:string
    AvatarURL:string
    Bio:string
    Info:string
}

const initialState:State = {
    ID:0,
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
        case fromAuthAction.EMAILVER_START:
            return state
        case fromAuthAction.REGISTER_START:
            return state
        case fromAuthAction.LOGIN_START:
            return state
        case fromAuthAction.SEND_INFO:
            return {...state,Info:action.payload}
        case fromAuthAction.LOGOUT_START:
            return initialState
        case fromAuthAction.AUTOLOGIN_START:
            return state
        case fromAuthAction.POST_SETTINGS:
            return state
        case fromAuthAction.SETTINGS_OK:
            let newname = action.payload.Name
            let newbio = action.payload.Bio
            let newavatar = action.payload.AvatarURL
            if (newname && newbio && newavatar){
                return {...state,Name:newname,Bio:newbio,AvatarURL:newavatar}
            }else if (newname && newbio){
                return {...state,Name:newname,Bio:newbio}
            }else if (newname && newavatar){
                return {...state,Name:newname,AvatarURL:newavatar}
            }else if (newbio && newavatar){
                return {...state,Bio:newbio,AvatarURL:newavatar}
            }else if (newname && !newbio && !newavatar){
                return {...state,Name:newname}
            }else if (newbio && !newname && !newavatar){
                return {...state,Bio:newbio}
            }else if (newavatar && !newbio && !newname){
                return {...state, AvatarURL:newavatar}
            }else{
                return state
            }
        case fromAuthAction.LOGIN_OK:
            return {
                ...state,
                ID:action.payload["ID"],
                Name:action.payload["Name"],
                AvatarURL:action.payload["AvatarURL"],
                Bio:action.payload["Bio"],
            }
        case fromAuthAction.DESTROY_INFO:
            return {...state,Info:""}
        default:
            return state
    }
}