//Hook to obtain NHS Number from the Login

//[Start reference]: https://www.youtube.com/watch?v=sP7ANcTpJr8
import { createContext } from 'react';

const PatientContext = createContext({
  NHSNumber: '',
  setNHSNumber: () => {},
});

export default PatientContext;
//[End reference]: https://www.youtube.com/watch?v=sP7ANcTpJr8