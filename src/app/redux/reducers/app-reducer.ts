import { ActionReducerMap } from "@ngrx/store";
import * as fromAuthReducer from './auth-reducer'
import * as fromArticleReducer from './article-reducer'
import * as fromCommentReducer from './comment-reducer'

export interface AppState {
    auth:fromAuthReducer.State,
    article:fromArticleReducer.State,
    comment:fromCommentReducer.State,
}

export const AppReducer:ActionReducerMap<AppState> = {
    auth:fromAuthReducer.AuthReducer,
    article:fromArticleReducer.ArticleReducer,
    comment:fromCommentReducer.CommentReducer,
}