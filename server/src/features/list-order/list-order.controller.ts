import { Router, Response } from 'express';

import MongodbAdapter from '~/db_adapters/mongodb';

const router = Router();

router.get('/', async (_, res: Response) => {
  console.log('GET /list-order');
  try {
    const listOrder = await MongodbAdapter.getListOrder();
    res.send(listOrder);
  } catch {
    res.sendStatus(500);
  }
});

export const listOrderController = router;
