import {Dictionary} from "../../../../constants";

export enum ValueType
{
    STRING = 'String',
    INTEGER = 'Integer',
    FLOAT = 'Float',
    DATE = 'Date'
}

export interface TableColumn
{
    name: string
    type: ValueType
}

export interface Table
{
    name: string
    columns: TableColumn[]
    rows?: Dictionary[]
}
