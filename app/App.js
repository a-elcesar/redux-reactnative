import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { Analytics } from './configs/Firebase';
import AppNavigator from './navigation/AppNavigator';
import Bootstrap from './bootstrap/bootstrap';
import BootstrapNavigation from './bootstrap/bootstrapNavigation';
import bootstrapSagas from './bootstrap/bootstrapSagas';
import { sagaMiddleware, store, persistor } from './configs/Store';

sagaMiddleware.run(bootstrapSagas);
export class App extends Component {
  // componentDidMount() {
  //   Analytics.setAnalyticsCollectionEnabled(true);
  // }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Bootstrap>
            <AppNavigator
              ref={navigatorRef => {
                BootstrapNavigation.setTopLevelNavigator(navigatorRef);
              }}
            />
          </Bootstrap>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
