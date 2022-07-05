import { DraggableLocation } from 'react-beautiful-dnd';
import { ListItem, List } from '~/types';

export interface ListsContextType {
  listItems: { [key: string]: ListItem };
  lists: { [key: string]: List };
  listOrder: string[];
  reorderList: ReorderList;
  moveListItem: MoveListItem;
  reorderListItem: ReorderListItem;
  addList: AddList;
  addListItem: AddListItem;
}

export interface AddListItem {
  (listId: string, content: string): void;
}

export interface AddList {
  (title: string): void;
}

export interface ListsProviderProps {
  children: React.ReactNode;
}

export interface ReorderList {
  ({}: {
    source: DraggableLocation;
    destination: DraggableLocation;
    draggableId: string;
  }): void;
}

export interface MoveListItem {
  ({}: {
    source: DraggableLocation;
    destination: DraggableLocation;
    draggableId: string;
  }): void;
}

export interface ReorderListItem {
  ({}: {
    source: DraggableLocation;
    destination: DraggableLocation;
    draggableId: string;
  }): void;
}
