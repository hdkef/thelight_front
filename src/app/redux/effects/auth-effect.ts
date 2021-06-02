import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromAuthAction from '../actions/auth-action'
import { HttpClient } from '@angular/common/http';
import {catchError, map, switchMap} from 'rxjs/operators'
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffect {
    
    constructor(private action$:Actions, private http:HttpClient, private router:Router){}

    loginStart$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromAuthAction.LOGIN_START),
            switchMap((action:fromAuthAction.LoginStart)=>{
                let payload = JSON.stringify({
                    Name:action.payload["Name"],
                    Pass:action.payload["Pass"],
                })
                return this.http.post(`${environment.api}${environment.login}`,payload).pipe(
                    map((data)=>{
                        let writerinfo = data["WriterInfo"]
                        let ID = writerinfo["ID"]
                        let Name = writerinfo["Name"]
                        let AvatarURL = writerinfo["AvatarURL"]
                        let Bio = writerinfo["Bio"]
                        let Token = data["Token"]
                        this.savetoLocal(Token)
                        return new fromAuthAction.LoginOK({ID,Name,AvatarURL,Bio})
                    }),
                    catchError((err)=>{
                        return of(new fromAuthAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

    autologinStart = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromAuthAction.AUTOLOGIN_START),
            switchMap((action:fromAuthAction.AutoLoginStart)=>{
                if (!localStorage.getItem("Bearer")){
                    return of(new fromAuthAction.SendInfo("NO TOKEN IN LOCAL STORAGE"))
                }else{
                    return this.http.get(`${environment.api}${environment.autologin}`).pipe(
                        map((data)=>{
                            let writerinfo = data["WriterInfo"]
                            let ID = writerinfo["ID"]
                            let Name = writerinfo["Name"]
                            let AvatarURL = writerinfo["AvatarURL"]
                            let Bio = writerinfo["Bio"]
                            let newtoken = data["NewToken"]
                            if (newtoken){
                                this.savetoLocal(newtoken)
                            }
                            return new fromAuthAction.LoginOK({ID,Name,AvatarURL,Bio})
                        }),
                        catchError((err)=>{
                            return of(new fromAuthAction.SendInfo(err.error))
                        })
                    )
                }
            })
        )
    })
    
    logoutStart = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromAuthAction.LOGOUT_START),
            switchMap((action:fromAuthAction.LogoutStart)=>{
                this.removeLocal()
                this.router.navigateByUrl("/admin/login")
                return of(new fromAuthAction.SendInfo("logged out"))
            }),
        )
    })

    savetoLocal(token:string){
        localStorage.setItem("Bearer", token)
    }

    removeLocal(){
        localStorage.removeItem("Bearer")
    }

    getfromLocal(){
        return localStorage.getItem("Bearer")
    }


    postSettings = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromAuthAction.POST_SETTINGS),
            switchMap((action:fromAuthAction.PostSettings)=>{
                let payload = action.payload
                return this.http.post(`${environment.api}${environment.settings}`,payload).pipe(
                    map((data)=>{
                        let Name = data["Name"]
                        let AvatarURL = data["AvatarURL"]
                        let Bio = data["Bio"]
                        return new fromAuthAction.SettingsOK({Name,AvatarURL,Bio})
                    }),
                    catchError((err)=>{
                        return of(new fromAuthAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

    emailVerStart = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromAuthAction.EMAILVER_START),
            switchMap((action:fromAuthAction.EmailVerStart)=>{
                let payload = JSON.stringify(action.payload)
                return this.http.post(`${environment.api}${environment.emailver}`,payload).pipe(
                    map((data)=>{
                        alert("email verification code sent")
                        let msg = data["MSG"]
                        return new fromAuthAction.SendInfo(msg)
                    }),
                    catchError((err)=>{
                        alert(err.error)
                        return of(new fromAuthAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

    registerStart = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromAuthAction.REGISTER_START),
            switchMap((action:fromAuthAction.RegisterStart)=>{
                let payload = JSON.stringify(action.payload)
                return this.http.post(`${environment.api}${environment.register}`,payload).pipe(
                    map((data)=>{
                        alert("REGISTRATION SUCCEED")
                        let msg = data["MSG"]
                        return new fromAuthAction.SendInfo(msg)
                    }),
                    catchError((err)=>{
                        alert(err.error)
                        return of(new fromAuthAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

}