import {Array} from '@nlib/global';
import {TypeGuardOf} from '../generics';

export const is$Array = Array.isArray as TypeGuardOf<Array<any>>;
