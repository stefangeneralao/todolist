import { useEffect, useState } from 'react';

import { List, ListItem, ListItems, Lists } from '~/types';

import {
  AddList,
  AddListItem,
  ListsContextType,
  ListsProviderProps,
  MoveListItem,
  RemoveList,
  RemoveListItem,
  ReorderList,
  ReorderListItem,
  SetListItemDescription,
  SetListItemTitle,
} from './types';
import { ListsContext } from './context';
import { Api } from '~/api';

export const ListsProvider = ({ children }: ListsProviderProps) => {
  const [listItems, setListItems] = useState<ListItems>({});
  const [lists, setLists] = useState<Lists>({});
  const [listOrder, setListOrder] = useState<string[]>([]);

  useEffect(() => {
    const getLists = async () => {
      try {
        const response = await Api.getLists();
        setLists(response);
      } catch (error) {
        console.log('error', error);
      }
    };

    const getListOrder = async () => {
      try {
        const response = await Api.getListOrder();
        setListOrder(response);
      } catch (error) {
        console.log('error', error);
      }
    };

    const getListItems = async () => {
      try {
        const response = await Api.getListItems();
        setListItems(response);
      } catch (error) {
        console.log('error', error);
      }
    };

    getLists();
    getListOrder();
    getListItems();
  }, []);

  const reorderList: ReorderList = async ({
    source,
    destination,
    draggableId,
  }) => {
    const currentListOrder = [...listOrder];

    const newListOrder = Array.from(listOrder);
    newListOrder.splice(source.index, 1);
    newListOrder.splice(destination.index, 0, draggableId);

    setListOrder(newListOrder);
    try {
      await Api.reorderList(newListOrder);
    } catch (error) {
      console.log('error', error);
      setListOrder(currentListOrder);
    }
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

  const addList: AddList = (title: string) => {
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

  const addListItem: AddListItem = async (listId: string, title: string) => {
    const currentListItems = { ...listItems };
    const currentLists = { ...lists };

    const listItemId = crypto.randomUUID();
    const newListItem: ListItem = {
      id: listItemId,
      title,
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
    try {
      await Api.addListItem(listId, title);
    } catch (error) {
      setListItems(currentListItems);
      setLists(currentLists);
      throw new Error(`Error adding list item: ${error}`);
    }
  };

  const setListItemTitle: SetListItemTitle = async (
    listItemId: string,
    title: string
  ) => {
    const currentListItems = { ...listItems };

    const newListItems: ListItems = {
      ...listItems,
      [listItemId]: {
        ...listItems[listItemId],
        title,
      },
    };

    setListItems(newListItems);
    try {
      await Api.updateListItem(listItemId, { title });
    } catch (error) {
      setListItems(currentListItems);
      throw new Error(`Error updating list item: ${error}`);
    }
  };

  const setListItemDescription: SetListItemDescription = async (
    listItemId: string,
    description: string
  ) => {
    const currentListItems = { ...listItems };

    const newListItems: ListItems = {
      ...listItems,
      [listItemId]: {
        ...listItems[listItemId],
        description,
      },
    };

    setListItems(newListItems);
    try {
      await Api.updateListItem(listItemId, { description });
    } catch (error) {
      setListItems(currentListItems);
      throw new Error(`Error updating list item: ${error}`);
    }
  };

  const removeListItem: RemoveListItem = async (listItemId: string) => {
    const currentListItems = { ...listItems };
    const currentLists = { ...lists };

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
    try {
      await Api.deleteListItem(listItemId);
    } catch (error) {
      setListItems(currentListItems);
      setLists(currentLists);
      throw new Error(`Error deleting list item: ${error}`);
    }
  };

  const removeList: RemoveList = (listId: string) => {
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
    setListItemTitle,
    setListItemDescription,
    removeListItem,
    removeList,
  };

  return (
    <ListsContext.Provider value={value}>{children}</ListsContext.Provider>
  );
};