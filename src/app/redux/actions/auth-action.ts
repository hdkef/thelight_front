import { Action } from "@ngrx/store";

export const LOGIN_START = "Auth Login Start"
export const AUTOLOGIN_START = "Auth AutoLogin Start"
export const LOGIN_OK = "Auth Login OK"
export const LOGOUT_START = "Auth Logout Start"
export const SEND_INFO = "Auth Send Info"
export const POST_SETTINGS = "Auth Post Settings"
export const SETTINGS_OK = "Auth Settings Bio Name Avatar OK"
export const DESTROY_INFO = "Auth Destroy Info"
export const REGISTER_START = "Auth Register Start"
export const EMAILVER_START = "Auth EmailVer Start"

export class EmailVerStart implements Action{
    type: string = EMAILVER_START
    constructor(public payload:{Name:string,Pass:string,Email:string}){}
}

export class RegisterStart implements Action{
    type: string = REGISTER_START
    constructor(public payload:{Email:string,Code:string}){}
}

export class DestroyInfo implements Action{
    type: string = DESTROY_INFO
}

export class PostSettings implements Action{
    type: string = POST_SETTINGS

    constructor(public payload:FormData){}
}

export class SettingsOK implements Action{
    type: string = SETTINGS_OK

    constructor(public payload:{
        Name:string,
        AvatarURL:string,
        Bio:string,
    }){}
}

export class LoginStart implements Action{
    type: string = LOGIN_START

    constructor(public payload:{Name:string,Pass:string}){}
}

export class AutoLoginStart implements Action{
    type: string = AUTOLOGIN_START

    constructor(){}
}

export class LoginOK implements Action{
    type: string = LOGIN_OK

    constructor(public payload:{
        ID:Number,
        Name:string,
        AvatarURL:string,
        Bio:string,
    }){}
}

export class LogoutStart implements Action{
    type: string = LOGOUT_START

    constructor(){}
}

export class SendInfo implements Action{
    type: string = SEND_INFO

    constructor(public payload:string){}
}