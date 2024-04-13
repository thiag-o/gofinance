import React from "react";
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
  signInWithGoogle: () => void;
  signInWithApple: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

GoogleSignin.configure({
  iosClientId: process.env.IOS_CLIENT_ID,
  webClientId: process.env.WEB_CLIENT_ID,
});

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as User);

  async function signInWithGoogle() {
    try {
      const result = await GoogleSignin.signIn();
      if (result.user) {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photo!,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(
          "@gofinance:user",
          JSON.stringify(userLogged)
        );
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
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: undefined,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(
          "@gofinance:user",
          JSON.stringify(userLogged)
        );
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
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
