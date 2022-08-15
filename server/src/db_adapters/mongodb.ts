import { MongoClient } from 'mongodb';

const { DB_USER: dbUser, DB_PASSWORD: dbPassword } = process.env;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.abhozjp.mongodb.net/?retryWrites=true&w=majority`;

class MongodbAdapter {
  private static client = new MongoClient(uri);
  private static database = MongodbAdapter.client.db('todolists');

  static getAllLists = async () => {
    const lists = MongodbAdapter.database.collection('lists');

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
    const listItems = MongodbAdapter.database.collection('list-items');

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

  static getListOrder = async () => {
    const listOrder = MongodbAdapter.database.collection('list-order');

    return (await listOrder.find().toArray()).map(({ _id }) => _id.toString());
  };
}

export default MongodbAdapter;
