import { useContext } from 'react';
import { ListsContext } from './context';

export const useLists = () => {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error('useItems must be used within a ListsProvider');
  }
  return context;
};
