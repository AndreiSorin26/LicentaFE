import {Dictionary} from "../../../../constants";

export enum ValueType
{
    STRING = 'Text',
    INTEGER = 'Integer'
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
    values?: Dictionary[]
}
