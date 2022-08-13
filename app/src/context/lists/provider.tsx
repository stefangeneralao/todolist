import { useState } from 'react';

import { List, ListItem } from '~/types';
import {
  listItems as mockedlistItems,
  lists as mockedlists,
  listOrder as mockedlistOrder,
} from '~/mocks/lists';

import {
  ListsContextType,
  ListsProviderProps,
  MoveListItem,
  ReorderList,
  ReorderListItem,
} from './types';
import { ListsContext } from './context';

export const ListsProvider = ({ children }: ListsProviderProps) => {
  const [listItems, setListItems] = useState<{ [key: string]: ListItem }>(
    mockedlistItems
  );
  const [lists, setLists] = useState<{ [key: string]: List }>(mockedlists);
  const [listOrder, setListOrder] = useState<string[]>(mockedlistOrder);

  const reorderList: ReorderList = ({ source, destination, draggableId }) => {
    const newListOrder = Array.from(listOrder);
    newListOrder.splice(source.index, 1);
    newListOrder.splice(destination.index, 0, draggableId);

    setListOrder(newListOrder);
  };

  const moveListItem: MoveListItem = ({ source, destination, draggableId }) => {
    const currentList = lists[source.droppableId];
    const previousList = lists[destination.droppableId];

    const currentListItemIds = Array.from(currentList.listItemIds);
    currentListItemIds.splice(source.index, 1);
    const newStart = {
      ...currentList,
      listItemIds: currentListItemIds,
    };

    const previousListItemIds = Array.from(previousList.listItemIds);
    previousListItemIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...previousList,
      listItemIds: previousListItemIds,
    };

    const newLists = {
      ...lists,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    setLists(newLists);
  };

  const reorderListItem: ReorderListItem = ({
    source,
    destination,
    draggableId,
  }) => {
    const currentList = lists[source.droppableId];
    const currentListItemIds = Array.from(currentList.listItemIds);
    currentListItemIds.splice(source.index, 1);
    currentListItemIds.splice(destination.index, 0, draggableId);

    const newList = {
      ...currentList,
      listItemIds: currentListItemIds,
    };

    const newLists = {
      ...lists,
      [newList.id]: newList,
    };

    setLists(newLists);
  };

  const addList = (title: string) => {
    const id = crypto.randomUUID();

    const newList: List = {
      id,
      title,
      listItemIds: [],
    };

    const newLists = {
      ...lists,
      [newList.id]: newList,
    };

    setListOrder([...listOrder, id]);
    setLists(newLists);
  };

  const addListItem = (listId: string, content: string) => {
    const listItemId = crypto.randomUUID();

    const newListItem: ListItem = {
      id: listItemId,
      content,
    };

    const newListItems = {
      ...listItems,
      [listItemId]: newListItem,
    };

    const newLists = {
      ...lists,
      [listId]: {
        ...lists[listId],
        listItemIds: [...lists[listId].listItemIds, listItemId],
      },
    };

    setListItems(newListItems);
    setLists(newLists);
  };

  const renameListItem = (listItemId: string, content: string) => {
    console.log('renameListItem', listItemId, content);

    const newListItems = {
      ...listItems,
      [listItemId]: {
        ...listItems[listItemId],
        content,
      },
    };

    setListItems(newListItems);
  };

  const removeListItem = (listItemId: string) => {
    const parentListEntries = Object.entries(lists);
    const parentListEntry = parentListEntries.find(([_, listValues]) =>
      listValues.listItemIds.includes(listItemId)
    );
    if (!parentListEntry) return;

    const [parentListId, parentListValue] = parentListEntry;
    const newParentListValue = {
      ...parentListValue,
      listItemIds: parentListValue.listItemIds.filter(
        (id) => id !== listItemId
      ),
    };
    const newParentListEntry = [parentListId, newParentListValue];
    const newParentList = Object.fromEntries([newParentListEntry]);
    const newLists = {
      ...lists,
      ...newParentList,
    };

    const newListItems = { ...listItems };
    delete newListItems[listItemId];

    setLists(newLists);
    setListItems(newListItems);
  };

  const removeList = (listId: string) => {
    const newListOrder = listOrder.filter((id) => id !== listId);
    setListOrder(newListOrder);

    const newLists = { ...lists };
    delete newLists[listId];

    setLists(newLists);
  };

  const value: ListsContextType = {
    lists,
    listItems,
    listOrder,
    reorderList,
    moveListItem,
    reorderListItem,
    addList,
    addListItem,
    renameListItem,
    removeListItem,
    removeList,
  };

  return (
    <ListsContext.Provider value={value}>{children}</ListsContext.Provider>
  );
};
