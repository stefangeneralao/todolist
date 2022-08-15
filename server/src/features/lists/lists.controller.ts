import { Router, Response } from 'express';

import MongodbAdapter from '~/db_adapters/mongodb';

const router = Router();

router.get('/', async (_, res: Response) => {
  console.log('GET /lists');
  try {
    const lists = await MongodbAdapter.getAllLists();
    res.send(lists);
  } catch {
    res.sendStatus(500);
  }
});

export const listsController = router;
