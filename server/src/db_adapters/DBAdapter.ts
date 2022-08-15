import { Lists, ListItems } from '/types';

abstract class DBAdapter {
  static getAllLists: () => Promise<Lists>;

  static getAllListItems: () => Promise<ListItems>;

  static getListOrder: () => Promise<string[]>;

  static updateListItem: (
    listItemId: string,
    config: { title?: string; description?: string }
  ) => Promise<void>;

  static addListItem: (listId: string, title: string) => Promise<string>;

  static deleteListItem: (listId: string) => Promise<void>;

  static reorderList: (listOrder: string[]) => Promise<void>;

  static moveListItem: (
    listItemId: string,
    sourceListId: string,
    destinationListId: string,
    destinationListItemIds: string[]
  ) => Promise<void>;

  static updateList: (
    listId: string,
    config: { title?: string; listItemIds?: string[] }
  ) => Promise<void>;

  static addList: (title: string) => Promise<string>;

  static deleteList: (listId: string) => Promise<void>;
}

export default DBAdapter;
