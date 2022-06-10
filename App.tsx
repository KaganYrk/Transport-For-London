import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GeneralDataProvider } from './app/contexts/generalData';
import { LoaderProvider } from './app/contexts/loader';
import Main from './app/navigation';

const App = () => (
  <GeneralDataProvider>
    <LoaderProvider>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </LoaderProvider>
  </GeneralDataProvider>
);

export default App;
