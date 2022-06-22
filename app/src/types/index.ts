export interface ListItem {
  id: string;
  content: string;
}

export interface List {
  id: string;
  title: string;
  listItemIds: string[];
}

export interface InitialData {
  listItems: { [key: string]: ListItem };
  lists: { [key: string]: List };
  listOrder: string[];
}
