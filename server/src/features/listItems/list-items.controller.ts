import { Router, Response, Request } from 'express';

import MongoDBAdapter from '~/db_adapters/MongoDBAdapter';

const router = Router();

router.get('/', async (_, res: Response) => {
  try {
    const listItems = await MongoDBAdapter.getAllListItems();
    res.send(listItems);
  } catch {
    res.sendStatus(500);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const {
    sourceListId,
    destinationListId,
    destinationListItemIds,
    ...updatedFields
  } = req.body;
  const listItemId = req.params.id;

  if (
    sourceListId &&
    destinationListId &&
    destinationListItemIds &&
    destinationListItemIds.length > 0
  ) {
    try {
      await MongoDBAdapter.moveListItem(
        listItemId,
        sourceListId,
        destinationListId,
        destinationListItemIds
      );
      res.send();
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  if (updatedFields) {
    try {
      await MongoDBAdapter.updateListItem(listItemId, updatedFields);
      res.send();
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  }

  res.sendStatus(204);
  return;
});

router.post('/', async (req: Request, res: Response) => {
  const { listId, title } = req.body;

  try {
    const response = await MongoDBAdapter.addListItem(listId, title);
    res.send(response);
  } catch {
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const listItemId = req.params.id;

  try {
    await MongoDBAdapter.deleteListItem(listItemId);
    res.send();
  } catch {
    res.sendStatus(500);
  }
});

export const listItemsController = router;
