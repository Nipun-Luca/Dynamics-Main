import { createContext } from 'react';

const ReceptionistContext = createContext({
  ReceptionistId: null,
  setReceptionistId: () => {},
});

export default ReceptionistContext;