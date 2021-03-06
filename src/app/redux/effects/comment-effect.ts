import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as fromCommentAction from '../actions/comment-action'

@Injectable()
export class CommentEffect {
    
    constructor(private action$:Actions, private http:HttpClient){}

    getComments = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromCommentAction.GET_COMMENTS),
            switchMap((action:fromCommentAction.GetComments)=>{
                let payload = JSON.stringify({ID:action.payload})
                return this.http.post(`${environment.api}${environment.commentgetall}`,payload).pipe(
                    map((data)=>{
                        let Comment = data["CommentsFromServer"]
                        return new fromCommentAction.RetrieveComments(Comment)
                    }),
                    catchError((err)=>{
                        return of(new fromCommentAction.SendInfo(err.error))
                    })
                )
            })
        )
    })

    insertComment = createEffect(()=>{
        return this.action$.pipe(
            ofType(fromCommentAction.INSERT_COMMENT),
            switchMap((action:fromCommentAction.InsertComment)=>{
                let payload = JSON.stringify({CommentFromClient:{
                    ID:action.payload.ID,
                    Name:action.payload.Name,
                    Text:action.payload.Text,
                }})
                return this.http.post(`${environment.api}${environment.commentinsert}`,payload).pipe(
                    map((data)=>{
                        return new fromCommentAction.InsertCommentOK(action.payload)
                    }),
                    catchError((err)=>{
                        return of(new fromCommentAction.SendInfo(err.error))
                    })
                )
            })
        )
    })
}