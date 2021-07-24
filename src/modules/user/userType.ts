
export interface userType{
    _ID: string
    username: string
}
export interface tempSetUserActionType{
    type: string,
    payload: {
        user: userType|null
    }
}
export type tempSetUserFunctionType = (user: userType)=> tempSetUserActionType
export interface checkActionType{
    type: string
}
export type checkFunctionType = ()=> checkActionType

export interface checkSuccessActionType{
    type: string
    payload?: {
        user: userType|null
    }
}
export type checkSuccessFunctionType = ()=> checkSuccessActionType

export interface checkFailureActionType{
    type: string
    payload?: {
        error: Error|null
    }
}
export type checkFailureFunctionType = ()=> checkFailureActionType

export type userActionType =
    |tempSetUserActionType
    |checkActionType
    |checkSuccessActionType
    |checkFailureActionType

export interface userStateType{
    user: userType|null,
    checkError: Error|null
}
