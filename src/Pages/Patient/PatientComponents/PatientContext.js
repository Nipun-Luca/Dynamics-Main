import { createContext } from 'react';

const PatientContext = createContext({
    NHSNumber: null,
    setNHSNumber: () => {},

});

export default PatientContext;
