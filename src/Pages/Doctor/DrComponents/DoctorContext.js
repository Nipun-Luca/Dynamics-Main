import { createContext } from 'react';

const DoctorContext = createContext({
  DoctorId: null,
  setDoctorId: () => {},
});

export default DoctorContext;

