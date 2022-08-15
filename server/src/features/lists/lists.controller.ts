import { Router, Request, Response } from 'express';

import MongoDBAdapter from '~/db_adapters/MongoDBAdapter';

const router = Router();

router.get('/', async (_, res: Response) => {
  try {
    const lists = await MongoDBAdapter.getAllLists();
    res.send(lists);
  } catch {
    res.sendStatus(500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const listId = req.params.id;
  const { title, listItemIds } = req.body;

  try {
    const response = await MongoDBAdapter.updateList(listId, {
      title,
      listItemIds,
    });
    res.send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const response = await MongoDBAdapter.addList(title);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  const listId = req.params.id;

  try {
    MongoDBAdapter.deleteList(listId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export const listsController = router;
