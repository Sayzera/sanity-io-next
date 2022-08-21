import '../styles/globals.css';
import { StoreProvider } from '../utils/store';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Provider store={store}>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </Provider>
    </SnackbarProvider>
  );
}

export default MyApp;
