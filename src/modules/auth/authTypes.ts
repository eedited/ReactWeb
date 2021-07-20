export interface authState{
    x: number
}
export interface sampleActionType{
    type: string
}
export interface sampleActionType2{
    type: string,
    x: number
}
export type authType = sampleActionType|sampleActionType2
