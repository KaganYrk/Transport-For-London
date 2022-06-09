import React, { createContext, memo, useEffect, useMemo, useState } from 'react';
import LineServices from '../services/lineService';
import { Modes } from '../types';

const GeneralDataContext = createContext<GeneralDataContextValue>({} as GeneralDataContextValue);

const GeneralDataProvider = memo(({ children }) => {
  const [modes, setModes] = useState <Modes[]>();
  const [serviceTypes, setServiceTypes] = useState <string[]>();

  useEffect(() => {
    LineServices.GetValidModes().then(item => setModes(item));
    LineServices.GetServiceTypes().then(item => setServiceTypes(item));
  }, []);

  const contextValue = useMemo(() => ({ modes, serviceTypes }), [modes, serviceTypes]);
  return (
    <GeneralDataContext.Provider value={contextValue}>
      {children}
    </GeneralDataContext.Provider>
  );
});

export { GeneralDataContext, GeneralDataProvider };

export type GeneralDataContextValue = {
    modes?: Modes[];
    serviceTypes?: string[]
}
