import { ListsProvider } from '~/context/lists';
import Lists from '~/components/Lists';
import NewListInput from '~/components/NewListInput';

const App = () => (
  <ListsProvider>
    <NewListInput />
    <Lists />
  </ListsProvider>
);
export default App;
