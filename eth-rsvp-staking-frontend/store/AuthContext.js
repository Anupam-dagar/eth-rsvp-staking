import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  const removeAccount = () => {
    setAccount(null);
  };

  const context = {
    account,
    setAccount,
    removeAccount,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
