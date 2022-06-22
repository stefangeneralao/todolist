import '@atlaskit/css-reset';

import { ListsProvider } from '~/context/lists';
import Lists from '~/components/Lists';

const App = () => {
  return (
    <ListsProvider>
      <Lists />
    </ListsProvider>
  );
};

export default App;
