import { ListItems, Lists } from '/types';

export const listItems: ListItems = {
  'listItem-1': {
    id: 'listItem-1',
    title: 'Gör klart kodprov',
    description: 'Just do it',
  },
  'listItem-2': {
    id: 'listItem-2',
    title: 'Mejla Khodor',
    description: 'Just do it... later',
  },
  'listItem-3': {
    id: 'listItem-3',
    title: 'Städa',
    description: "Just don't",
  },
  'listItem-4': { id: 'listItem-4', title: 'Laga mat' },
};

export const lists: Lists = {
  'list-1': {
    id: 'list-1',
    title: 'To do',
    listItemIds: ['listItem-1', 'listItem-2', 'listItem-3', 'listItem-4'],
  },
  'list-2': {
    id: 'list-2',
    title: 'In progress',
    listItemIds: [],
  },
  'list-3': {
    id: 'list-3',
    title: 'Done',
    listItemIds: [],
  },
};

export const listOrder: string[] = ['list-1', 'list-2', 'list-3'];

export default {
  listItems,
  lists,
  listOrder,
};
