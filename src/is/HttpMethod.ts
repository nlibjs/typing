import {definition} from '../definition';
import {createTypeChecker} from '../createTypeChecker';

export type HttpMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
export const isHttpMethod = createTypeChecker<HttpMethod>(
    'HttpMethod',
    definition.enum<HttpMethod>('CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'),
);
