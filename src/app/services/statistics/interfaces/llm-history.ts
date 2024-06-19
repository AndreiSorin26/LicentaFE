export interface LlmResponse
{
    natural_language: string;
    query: string;
    success: boolean;
    execution_time: number;
}

export interface Sort
{
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable
{
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface LlmHistory
{
    content: LlmResponse[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}
