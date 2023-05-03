import { createContext } from 'react';

const PatientContext = createContext({
    nhsNumber: null,
    setNhsNumber: () => {},

});

export default PatientContext;
