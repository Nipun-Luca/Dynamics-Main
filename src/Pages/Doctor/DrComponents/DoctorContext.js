//****Author- w1785478 *****/
import { createContext } from 'react';


//This code snippet creates a React context for managing and sharing the DoctorId state throughout the doctor-related components in the application. 
const DoctorContext = createContext({
  DoctorId: null,
  setDoctorId: () => {},
});

export default DoctorContext;

