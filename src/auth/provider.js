import React, { useState, useContext, createContext } from 'react';
import * as authClient from './client';

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  async function login({ username, password }) {
    try {
      const u = await authClient.login({ username, password });
      return setUser(u);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  function logout() {
    authClient.logout().then((u) => setUser(u));
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used with an AuthProvider`);
  }
  return context;
}

function useConsumer(props) {
  const [user] = useState(null);
  return (
    <AuthContext.Consumer value={{ user }}>
      {props.children}
    </AuthContext.Consumer>
  );
}

export { AuthProvider, useAuth, useConsumer };
