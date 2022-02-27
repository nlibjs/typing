import {createTypeChecker} from '../createTypeChecker';
import type {Nominal} from '../generics';

export type Base64String = Nominal<string, 'Base64String'>;
export const isBase64String = createTypeChecker<Base64String, 'Base64String'>('Base64String', /^[A-Za-z0-9+/]+=*$/);
