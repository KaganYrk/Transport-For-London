import React from 'react';
import { GeneralDataProvider } from './app/contexts/generalData';
import Main from './app/navigation';

const App = () => (
  <GeneralDataProvider>
    <Main />
  </GeneralDataProvider>
);

export default App;
