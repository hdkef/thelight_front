import { ActionReducerMap } from "@ngrx/store";
import * as fromAuthReducer from './auth-reducer'
import * as fromArticleReducer from './article-reducer'
import * as fromCommentReducer from './comment-reducer'
import * as fromMediaReducer from './media-reducer'

export interface AppState {
    auth:fromAuthReducer.State,
    article:fromArticleReducer.State,
    comment:fromCommentReducer.State,
    media:fromMediaReducer.State,
}

export const AppReducer:ActionReducerMap<AppState> = {
    auth:fromAuthReducer.AuthReducer,
    article:fromArticleReducer.ArticleReducer,
    comment:fromCommentReducer.CommentReducer,
    media:fromMediaReducer.MediaReducer,
}