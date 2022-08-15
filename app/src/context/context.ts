import { createContext } from 'react';
import { defaultValue } from './defaultValue';
import { ListsContextType } from './types';

export const ListsContext = createContext<ListsContextType>(defaultValue);
