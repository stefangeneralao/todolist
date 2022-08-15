export interface ListItem {
  id: string;
  title: string;
  description?: string;
}

export interface ListItems {
  [listItemId: string]: ListItem;
}

export interface List {
  id: string;
  title: string;
  listItemIds: string[];
}

export interface Lists {
  [listId: string]: List;
}
