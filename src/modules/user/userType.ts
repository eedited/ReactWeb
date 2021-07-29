import { LOGOUT, SET_USER } from './user';

export interface userType{
    userId: string
}
export interface setUserActionType{
    type: typeof SET_USER,
    payload: {
        userId: string
    }
}
export interface logoutActionType{
    type: typeof LOGOUT
}
export interface userStateType{
    user: userType|null
}

export type userActionType =
    |setUserActionType
    |logoutActionType
