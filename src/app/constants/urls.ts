import { BASE_URL, WS_BASE_URL } from '../../environments/environment';

export const API_URL: string = `${ BASE_URL }/api/v1`;
export const WS_API_URL: string = `${ WS_BASE_URL }/api/v1`;

export const GRAPHQL_URL: string = `${ API_URL }/graphql`;
export const WS_GRAPHQL_URL: string = `${ WS_API_URL }/graphql`;

export const GQL_PUBLIC_URL: string = `${ GRAPHQL_URL }/public`;
export const WS_GQL_PUBLIC_URL: string = `${ WS_GRAPHQL_URL }/public`;

export const GQL_CLIENT_URL: string = `${ GRAPHQL_URL }/client`;
export const WS_GQL_CLIENT_URL: string = `${ WS_GRAPHQL_URL }/client`;