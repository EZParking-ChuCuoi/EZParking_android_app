/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';

const clientQuery = new QueryClient();
const AppComponent = () => (
  <QueryClientProvider client={clientQuery}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </QueryClientProvider>
);
AppRegistry.registerComponent(appName, () => AppComponent);
