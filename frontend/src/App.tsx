import '@fontsource/commissioner';
import '@fontsource/roboto-mono';
import { Provider as StateProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { store } from './store';
import { theme } from './theme';
import Routes from './routes';
import { AlertProvider } from './providers/AlertProvider';
import { LoaderProvider } from './providers/LoaderProvider';
import { ModalProvider } from './providers/ModalProvider';

const cache = createCache({
  key: 'css',
  prepend: true
});

//

const App = () => (
  <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <StateProvider store={store}>
        <AlertProvider>
          <LoaderProvider>
            <ModalProvider>
              <Router basename="web">
                <Routes />
              </Router>
            </ModalProvider>
          </LoaderProvider>
        </AlertProvider>
      </StateProvider>
    </ThemeProvider>
  </CacheProvider>
);

export default App;
