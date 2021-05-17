import { ActionReducerMap } from "@ngrx/store";
import * as fromAuthReducer from './auth-reducer'

export interface AppState {
    auth:fromAuthReducer.State,
}

export const AppReducer:ActionReducerMap<AppState> = {
    auth:fromAuthReducer.AuthReducer,
}