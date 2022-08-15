import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import { ListsProvider } from '~/context';
import Lists from '~/components/Lists';
import NewListInput from '~/components/NewListInput';

const theme = createTheme({
  typography: {
    h3: {
      fontSize: '1.5rem',
    },
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <ListsProvider>
      <NewListInput />
      <Lists />
    </ListsProvider>
  </ThemeProvider>
);
export default App;
