export interface userType{
    userId: string
}
export interface setUserActionType{
    type: string,
    payload: {
        userId: string
    }
}
export interface logoutActionType{
    type: string
}
export interface userStateType{
    user: userType|null
}

export type userActionType =
    |setUserActionType
    |logoutActionType
