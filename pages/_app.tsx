// ========== _app
// import all modules
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleSheetManager } from 'styled-components';
import persistedStore from '../redux/store';
import { GlobalStyles } from '../styles';
import { shouldForwardProp } from '../styles/shouldForwardProp';

function MyApp({ Component, pageProps }: AppProps) {
  const { store, persistor } = persistedStore;

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />
          <GlobalStyles />
        </PersistGate>
      </Provider>
    </StyleSheetManager>
  );
}

export default MyApp;
