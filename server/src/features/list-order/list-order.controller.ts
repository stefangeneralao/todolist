import { Router, Request, Response } from 'express';

import MongoDBAdapter from '~/db_adapters/MongoDBAdapter';

const router = Router();

router.get('/', async (_, res: Response) => {
  try {
    const listOrder = await MongoDBAdapter.getListOrder();
    res.send(listOrder);
  } catch {
    res.sendStatus(500);
  }
});

router.put('/', async (req: Request, res: Response) => {
  const { listOrder } = req.body;

  try {
    await MongoDBAdapter.reorderList(listOrder);
    res.send();
  } catch {
    res.sendStatus(500);
  }
});

export const listOrderController = router;
