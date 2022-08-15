import axios from 'axios';

const getListOrder = () => Api.get(`${Api.baseurl}/list-order`);
const reorderList = (listOrder: string[]) =>
  Api.put(`${Api.baseurl}/list-order`, { listOrder });

const getLists = () => Api.get(`${Api.baseurl}/lists`);

const getListItems = () => Api.get(`${Api.baseurl}/list-items`);
const addListItem = (listId: string, title: string) =>
  Api.post(`${Api.baseurl}/list-items`, { listId, title });
const updateListItem = (
  listItemId: string,
  config: { title?: string; description?: string }
) => Api.put(`${Api.baseurl}/list-items/${listItemId}`, config);
const deleteListItem = (listItemId: string) =>
  Api.delete(`${Api.baseurl}/list-items/${listItemId}`);

export class Api {
  static baseurl = 'http://localhost:3001';

  static getListOrder = getListOrder;
  static reorderList = reorderList;

  static getLists = getLists;

  static getListItems = getListItems;
  static updateListItem = updateListItem;
  static addListItem = addListItem;
  static deleteListItem = deleteListItem;

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

  static delete = async (url: string) => {
    const response = await axios.delete(url);
    return response.data;
  };
}
