import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};
// true && (obj) => dung ->obj / sai -> true


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch1] = useReducer(AuthReducer, INITIAL_STATE);
    useEffect(() => {
      localStorage.setItem("user",JSON.stringify(state.currentUser))
    }, [state.currentUser])
    
  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch1 }}>
      {children}
    </AuthContext.Provider>
  );
};
