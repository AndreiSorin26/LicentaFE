export interface SuccessRate
{
    modelName: string
    hits: number
    misses: number
    /*
    * "modelName": "openai",
            "hits": 3,
            "misses": 0*/
}

export interface SuccessRateResponse
{
    modelSuccessDtoList: SuccessRate[]
}
