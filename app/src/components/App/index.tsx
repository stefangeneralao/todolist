import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

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
    <SnackbarProvider maxSnack={4}>
      <ListsProvider>
        <NewListInput />
        <Lists />
      </ListsProvider>
    </SnackbarProvider>
  </ThemeProvider>
);
export default App;
