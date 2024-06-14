export interface SuccessRate
{
    modelName: string
    hits: number
    misses: number
}

export interface SuccessRateResponse
{
    modelSuccessDtoList: SuccessRate[]
}
