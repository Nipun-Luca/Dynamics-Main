// Patient/PatientComponents/PatientContext.js
import { createContext } from 'react';

const PatientContext = createContext({
  NHSNumber: '',
  setNHSNumber: () => {},
});

export default PatientContext;
