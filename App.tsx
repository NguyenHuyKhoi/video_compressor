import {AppContainer} from '@navigation';
import * as React from 'react';
import {FC, Suspense} from 'react';
import {I18nextProvider} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import i18next from './src/common/i18n/i18n';
import {MenuProvider} from 'react-native-popup-menu';
import {CustomMessage, GlobalAlert, globalAlertRef} from '@components';
import FlashMessage from 'react-native-flash-message';
interface AppProps {}
export const App: FC<AppProps> = ({}) => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18next}>
            <Suspense fallback={null}>
              <MenuProvider>
                <AppContainer />
                <GlobalAlert ref={globalAlertRef} />
                <FlashMessage
                  position="top"
                  MessageComponent={({message}: {message: any}) => (
                    <CustomMessage {...message} />
                  )}
                />
              </MenuProvider>
            </Suspense>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
