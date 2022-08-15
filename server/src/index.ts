import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import { listsController } from './features/lists';
import { listOrderController } from './features/list-order';
import { listItemsController } from './features/listItems';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/lists', listsController);
app.use('/list-order', listOrderController);
app.use('/list-items', listItemsController);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
