import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, logout } from "../firebase/firebase-config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, isLoading] = useAuthState(auth);

  const userLogin = async (email, password) => {
    const err = await logInWithEmailAndPassword(email, password);
    if (err) {
      alert(err);
    }
  };

  const userLogout = () => {
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        userLogout,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
