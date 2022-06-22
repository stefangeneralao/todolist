import { InitialData } from '~/types';

export const listItems = {
  'listItem-1': { id: 'listItem-1', content: 'Gör klart kodprov' },
  'listItem-2': { id: 'listItem-2', content: 'Mejla Khodor' },
  'listItem-3': { id: 'listItem-3', content: 'Städa' },
  'listItem-4': { id: 'listItem-4', content: 'Laga mat' },
};

export const lists = {
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

export const listOrder = ['list-1', 'list-2', 'list-3'];

export default {
  listItems,
  lists,
  listOrder,
};
