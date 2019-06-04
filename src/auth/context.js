import React, { useContext, createContext, useState } from 'react';
import * as authClient from './client';

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  const login = (form) => authClient.login(form).then((u) => setUser(u));
  const logout = () => authClient.logout().then((u) => setUser(u));

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
      {...props}
    />
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used with an AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
