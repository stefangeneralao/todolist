import { MongoClient, ObjectId } from 'mongodb';
import DBAdapter from './DBAdapter';

const { DB_USER: dbUser, DB_PASSWORD: dbPassword } = process.env;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.abhozjp.mongodb.net/?retryWrites=true&w=majority`;

class MongoDBAdapter extends DBAdapter {
  private static client = new MongoClient(uri);
  private static database = MongoDBAdapter.client.db('todolists');

  static getAllLists = async () => {
    const lists = MongoDBAdapter.database.collection('lists');

    return (await lists.find().toArray()).reduce((previous, current) => {
      const { _id, ...rest } = current;
      const id = _id.toString();
      const list = { id, ...rest };

      return {
        ...previous,
        [id]: list,
      };
    }, {});
  };

  static getAllListItems = async () => {
    const listItems = MongoDBAdapter.database.collection('list-items');

    return (await listItems.find().toArray()).reduce((previous, current) => {
      const { _id, ...rest } = current;
      const id = _id.toString();
      const listItem = { id, ...rest };

      return {
        ...previous,
        [id]: listItem,
      };
    }, {});
  };

  static getListOrder = async (): Promise<string[]> => {
    const listOrder = MongoDBAdapter.database.collection('list-order');

    return (await listOrder.find().toArray())[0].order;
  };

  static updateListItem = async (
    listItemId: string,
    config: { title?: string; description?: string }
  ) => {
    const listItems = MongoDBAdapter.database.collection('list-items');
    await listItems.updateOne(
      { _id: new ObjectId(listItemId) },
      { $set: config }
    );
  };

  static addListItem = async (listId: string, title: string) => {
    const listItems = MongoDBAdapter.database.collection('list-items');
    const listItem = await listItems.insertOne({
      listId,
      title,
    });

    const lists = MongoDBAdapter.database.collection('lists');
    await lists.updateOne(
      { _id: new ObjectId(listId) },
      { $push: { listItemIds: listItem.insertedId.toString() } }
    );

    return listItem.insertedId.toString();
  };

  static deleteListItem = async (listItemId: string) => {
    const listItems = MongoDBAdapter.database.collection('list-items');
    await listItems.deleteOne({ _id: new ObjectId(listItemId) });
  };

  static reorderList = async (order: string[]) => {
    const listOrderDocument = MongoDBAdapter.database.collection('list-order');
    await listOrderDocument.updateOne({}, { $set: { order } });
  };

  static moveListItem = async (
    listItemId: string,
    sourceListId: string,
    destinationListId: string,
    destinationListItemIds: string[]
  ) => {
    const lists = MongoDBAdapter.database.collection('lists');
    await Promise.all([
      lists.updateOne(
        { _id: new ObjectId(sourceListId) },
        { $pull: { listItemIds: listItemId } }
      ),
      lists.updateOne(
        { _id: new ObjectId(destinationListId) },
        { $set: { listItemIds: destinationListItemIds } }
      ),
    ]);
  };

  static updateList = async (
    listId: string,
    config: { title?: string; listItemIds?: string[] }
  ) => {
    const lists = MongoDBAdapter.database.collection('lists');
    await lists.updateOne(
      { _id: new ObjectId(listId) },
      { $set: JSON.parse(JSON.stringify(config)) }
    );
  };

  static addList = async (title: string) => {
    const lists = MongoDBAdapter.database.collection('lists');
    const listOrder = MongoDBAdapter.database.collection('list-order');

    const list = await lists.insertOne({
      title,
      listItemIds: [],
    });

    await listOrder.updateOne(
      {},
      { $push: { order: list.insertedId.toString() } }
    );

    return list.insertedId.toString();
  };

  static deleteList = async (listId: string) => {
    const lists = MongoDBAdapter.database.collection('lists');
    const listItems = MongoDBAdapter.database.collection('list-items');
    const listOrder = MongoDBAdapter.database.collection('list-order');

    const listItemIds = (await lists.findOne({ _id: new ObjectId(listId) }))
      .listItemIds;

    await Promise.all([
      listItems.deleteMany({ _id: { $in: listItemIds } }),
      lists.deleteOne({ _id: new ObjectId(listId) }),
      listOrder.updateOne({}, { $pull: { order: listId } }),
    ]);
  };
}

export default MongoDBAdapter;
