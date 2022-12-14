import axios from 'axios';

const getListOrder = () => Api.get(`${Api.baseurl}/list-order`);

const reorderList = (listOrder: string[]) =>
  Api.put(`${Api.baseurl}/list-order`, { listOrder });

const getLists = () => Api.get(`${Api.baseurl}/lists`);

const addList = (title: string) => Api.post(`${Api.baseurl}/lists`, { title });

const deleteList = (listId: string) =>
  Api.delete(`${Api.baseurl}/lists/${listId}`);

const getListItems = () => Api.get(`${Api.baseurl}/list-items`);

const addListItem = (listId: string, title: string) =>
  Api.post(`${Api.baseurl}/list-items`, { listId, title });

const updateListItem = (
  listItemId: string,
  config: { title?: string; description?: string }
) => Api.patch(`${Api.baseurl}/list-items/${listItemId}`, config);

const deleteListItem = (listItemId: string) =>
  Api.delete(`${Api.baseurl}/list-items/${listItemId}`);

const moveListItem = (
  listItemId: string,
  sourceListId: string,
  destinationListId: string,
  destinationListItemIds: string[]
) =>
  Api.patch(`${Api.baseurl}/list-items/${listItemId}`, {
    sourceListId,
    destinationListId,
    destinationListItemIds,
  });

const updateListItemsIds = (listId: string, listItemIds: string[]) =>
  Api.patch(`${Api.baseurl}/lists/${listId}`, { listItemIds });

const updateListTitle = (listId: string, title: string) =>
  Api.patch(`${Api.baseurl}/lists/${listId}`, { title });

export class Api {
  static baseurl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

  static getListOrder = getListOrder;
  static reorderList = reorderList;

  static getLists = getLists;
  static addList = addList;
  static deleteList = deleteList;

  static getListItems = getListItems;
  static updateListItem = updateListItem;
  static addListItem = addListItem;
  static deleteListItem = deleteListItem;
  static moveListItem = moveListItem;
  static updateListItemsIds = updateListItemsIds;
  static updateListTitle = updateListTitle;

  static get = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

  static post = async (url: string, data: any) => {
    const response = await axios.post(url, data);
    return response.data;
  };

  static put = async (url: string, data: any) => {
    const response = await axios.put(url, data);
    return response.data;
  };

  static patch = async (url: string, data: any) => {
    const response = await axios.patch(url, data);
    return response.data;
  };

  static delete = async (url: string) => {
    const response = await axios.delete(url);
    return response.data;
  };
}
