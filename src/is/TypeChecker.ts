import {createTypeChecker} from '../createTypeChecker';
import {definitionStore} from '../definition.private';
import type {TypeChecker} from '../generics';

export const isTypeChecker = createTypeChecker<TypeChecker<unknown>>(
    'TypeChecker',
    (input: unknown): input is TypeChecker<unknown> => definitionStore.has(input as TypeChecker<unknown>),
);
