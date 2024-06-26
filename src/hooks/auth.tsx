import React, { useEffect } from "react";
import { ReactNode, createContext, useContext, useState } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
interface AuthProviderProps {
  children: ReactNode;
}
interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

GoogleSignin.configure({
  iosClientId: process.env.IOS_CLIENT_ID,
  webClientId: process.env.WEB_CLIENT_ID,
});

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = "@gofinance:user";

  async function signInWithGoogle() {
    try {
      const result = await GoogleSignin.signIn();
      if (result.user) {
        const name = result.user.name!;
        const photo =
          result.user.photo ??
          `https://ui-avatars.com/api/?name=${name}&lenght=1`;
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name,
          photo,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw error;
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&lenght=1`;
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    setUser({} as User);
    AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);
      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
