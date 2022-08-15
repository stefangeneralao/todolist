import { Router, Response } from 'express';

import MongodbAdapter from '~/db_adapters/mongodb';

const router = Router();

router.get('/', async (_, res: Response) => {
  console.log('GET /list-items');
  try {
    const listItems = await MongodbAdapter.getAllListItems();
    res.send(listItems);
  } catch {
    res.sendStatus(500);
  }
});

export const listItemsController = router;
