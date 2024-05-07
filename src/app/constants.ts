export const BACKEND_BASE_URL = (port: number) => `http://localhost:${port}/api/v1`;

export const AUTH_PORT = 8090
export const BACKEND_AUTH_URL = BACKEND_BASE_URL(AUTH_PORT)

export const PROXY_PORT = 8091
export const BACKEND_PROXY_URL = BACKEND_BASE_URL(PROXY_PORT)

export const Routes =
    {
        AUTH:
            {
                LOGIN: `${BACKEND_AUTH_URL}/auth/login`,
                REGISTER: `${BACKEND_AUTH_URL}/auth/register`,
            },
        TABLE:
            {
                ADD_TABLE: `${BACKEND_PROXY_URL}/table/create`,
                GET_USER_TABLES: `${BACKEND_PROXY_URL}/table/get`,
                INSERT_INTO_TABLE: `${BACKEND_PROXY_URL}/table/insert`,
                QUERY_TABLE: (model: string) => `${BACKEND_PROXY_URL}/${model}/chat`,
                RUN_QUERY: `${BACKEND_PROXY_URL}/table/run`
            }
    };

export type Dictionary = {[key: string]: any};
