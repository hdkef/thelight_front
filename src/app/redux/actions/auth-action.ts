import { Action } from "@ngrx/store";

export const LOGIN_START = "Auth Login Start"
export const AUTOLOGIN_START = "Auth AutoLogin Start"
export const LOGIN_OK = "Auth Login OK"
export const LOGOUT_START = "Auth Logout Start"
export const SEND_INFO = "Auth Send Info"

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
        ID:string,
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