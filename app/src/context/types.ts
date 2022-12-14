import { DraggableLocation } from 'react-beautiful-dnd';
import { ListItems, Lists } from '/types';

export interface ListsContextType {
  listItems: ListItems;
  lists: Lists;
  listOrder: string[];
  reorderList: ReorderList;
  moveListItem: MoveListItem;
  reorderListItem: ReorderListItem;
  addList: AddList;
  addListItem: AddListItem;
  setListItemTitle: SetListItemTitle;
  setListItemDescription: SetListItemDescription;
  setListTitle: SetListTitle;
  removeListItem: RemoveListItem;
  removeList: RemoveList;
}

export interface RemoveList {
  (listId: string): void;
}

export interface RemoveListItem {
  (listItemId: string): Promise<void>;
}

export interface SetListItemTitle {
  (listItemId: string, title: string): Promise<void>;
}

export interface SetListItemDescription {
  (listItemId: string, description: string): Promise<void>;
}

export interface SetListTitle {
  (listId: string, title: string): Promise<void>;
}

export interface AddListItem {
  (listId: string, title: string): Promise<void>;
}

export interface AddList {
  (title: string): Promise<void>;
}

export interface ListsProviderProps {
  children: React.ReactNode;
}

export interface ReorderList {
  ({}: {
    source: DraggableLocation;
    destination: DraggableLocation;
    draggableId: string;
  }): Promise<void>;
}

export interface MoveListItem {
  ({}: {
    source: DraggableLocation;
    destination: DraggableLocation;
    draggableId: string;
  }): Promise<void>;
}

export interface ReorderListItem {
  ({}: {
    source: DraggableLocation;
    destination: DraggableLocation;
    draggableId: string;
  }): Promise<void>;
}
