export const BACKEND_BASE_URL = 'http://localhost:8000';

export const Routes =
    {
        BACKEND_BASE_URL,
        AUTH:
            {
                LOGIN: `${BACKEND_BASE_URL}/auth/login`,
                REGISTER: `${BACKEND_BASE_URL}/auth/register`,
            },
        TABLE:
            {
                ADD_TABLE: `${BACKEND_BASE_URL}/table/add_table`,
                GET_USER_TABLES: `${BACKEND_BASE_URL}/table/get_user_tables`,
                INSERT_INTO_TABLE: `${BACKEND_BASE_URL}/table/insert_into_table`,
                QUERY_TABLE: `${BACKEND_BASE_URL}/table/query_table`
            }
    };

export type Dictionary = {[key: string]: any};
