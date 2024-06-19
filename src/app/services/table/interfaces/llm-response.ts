export interface LlmResponse
{
    sql_query: string;
    sql_syntax?: string;
    sql_context?: string;
}
