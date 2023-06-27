/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Tabs from './routes/tabs';
import createTable from './db/table';
import {PortalProvider} from '@gorhom/portal';
import {Provider as StoreProvider} from 'react-redux';
import store from './store/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    createTable();
  }, []);

  return (
    <PortalProvider>
      <StoreProvider store={store}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </StoreProvider>
    </PortalProvider>
  );
};

export default gestureHandlerRootHOC(App);
