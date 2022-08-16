import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { v4 as uuid } from 'uuid';

import { ListItem, ListItems, Lists } from '/types';

import { Api } from '~/api';

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

export const ListsProvider = ({ children }: ListsProviderProps) => {
  const [listItems, setListItems] = useState<ListItems>({});
  const [lists, setLists] = useState<Lists>({});
  const [listOrder, setListOrder] = useState<string[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getInitialState = async () => {
      try {
        const [initialLists, initialListOrder, initialListItems] =
          await Promise.all([
            Api.getLists(),
            Api.getListOrder(),
            Api.getListItems(),
          ]);
        setLists(initialLists);
        setListOrder(initialListOrder);
        setListItems(initialListItems);
      } catch {
        enqueueSnackbar('Could not get initial state', { variant: 'error' });
      }
    };
    getInitialState();
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
      setListOrder(currentListOrder);
      enqueueSnackbar('Could not reorder list', { variant: 'error' });
    }
  };

  const moveListItem: MoveListItem = async ({
    source,
    destination,
    draggableId,
  }) => {
    const currentLists = { ...lists };

    const sourceList = lists[source.droppableId];
    const destinationList = lists[destination.droppableId];

    const sourceListItemIds = Array.from(sourceList.listItemIds);
    sourceListItemIds.splice(source.index, 1);
    const newStart = {
      ...sourceList,
      listItemIds: sourceListItemIds,
    };

    const destinationListItemIds = Array.from(destinationList.listItemIds);
    destinationListItemIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...destinationList,
      listItemIds: destinationListItemIds,
    };

    const newLists = {
      ...lists,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    setLists(newLists);
    try {
      await Api.moveListItem(
        draggableId,
        sourceList.id,
        destinationList.id,
        destinationListItemIds
      );
    } catch (error) {
      setLists(currentLists);
      enqueueSnackbar('Could not move list item', { variant: 'error' });
    }
  };

  const reorderListItem: ReorderListItem = async ({
    source,
    destination,
    draggableId,
  }) => {
    const currentLists = { ...lists };

    const sourceList = lists[source.droppableId];
    const sourceListItemIds = Array.from(sourceList.listItemIds);
    sourceListItemIds.splice(source.index, 1);
    sourceListItemIds.splice(destination.index, 0, draggableId);

    const newList = {
      ...sourceList,
      listItemIds: sourceListItemIds,
    };

    const newLists = {
      ...lists,
      [newList.id]: newList,
    };

    setLists(newLists);
    try {
      await Api.updateListItemsIds(newList.id, sourceListItemIds);
    } catch (error) {
      setLists(currentLists);
      enqueueSnackbar('Could not reorder list item', { variant: 'error' });
    }
  };

  const addList: AddList = async (title: string) => {
    const currentLists = { ...lists };
    const currentListOrder = [...listOrder];

    const addListToState = (listId: string) => {
      const newList = {
        id: listId,
        title,
        listItemIds: [],
      };
      const newLists = { ...currentLists, [listId]: newList };
      setLists(newLists);
      setListOrder([...currentListOrder, listId]);
    };

    const listId = uuid();
    addListToState(listId);
    try {
      const newListId = await Api.addList(title);
      addListToState(newListId);
      setListOrder([...currentListOrder, newListId]);
    } catch (error) {
      setLists(currentLists);
      setListOrder(currentListOrder);
      enqueueSnackbar('Could not add list', { variant: 'error' });
    }
  };

  const addListItem: AddListItem = async (listId: string, title: string) => {
    const currentListItems = { ...listItems };
    const currentLists = { ...lists };

    const addListItemToState = (listItemId: string) => {
      const newListItem: ListItem = {
        id: listItemId,
        title,
      };

      const newListItems = {
        ...currentListItems,
        [listItemId]: newListItem,
      };

      const newLists = {
        ...currentLists,
        [listId]: {
          ...currentLists[listId],
          listItemIds: [...currentLists[listId].listItemIds, listItemId],
        },
      };

      setListItems(newListItems);
      setLists(newLists);
    };

    const optimisticListItemId = uuid();
    addListItemToState(optimisticListItemId);
    try {
      const newListItemId = await Api.addListItem(listId, title);
      addListItemToState(newListItemId);
    } catch (error) {
      setListItems(currentListItems);
      setLists(currentLists);
      enqueueSnackbar('Could not add list item', { variant: 'error' });
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
      enqueueSnackbar('Could not update list item', { variant: 'error' });
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
      enqueueSnackbar('Could not update list item', { variant: 'error' });
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
      enqueueSnackbar('Could not delete list item', { variant: 'error' });
    }
  };

  const removeList: RemoveList = async (listId: string) => {
    const currentLists = { ...lists };
    const currentListOrder = [...listOrder];

    const newListOrder = listOrder.filter((id) => id !== listId);
    const newLists = { ...lists };
    delete newLists[listId];

    setListOrder(newListOrder);
    setLists(newLists);
    try {
      await Api.deleteList(listId);
    } catch (error) {
      setListOrder(currentListOrder);
      setLists(currentLists);
      enqueueSnackbar('Could not delete list', { variant: 'error' });
    }
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
