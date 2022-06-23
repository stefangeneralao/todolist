import { ListsContextType } from './types';

export const defaultValue: ListsContextType = {
  listItems: {},
  lists: {},
  listOrder: [],
  reorderList: () => {},
  moveListItem: () => {},
  reorderListItem: () => {},
};
