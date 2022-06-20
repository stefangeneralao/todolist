export interface ListItem {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface InitialData {
  tasks: { [key: string]: ListItem };
  lists: { [key: string]: Column };
  columnOrder: string[];
}
