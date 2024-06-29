import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context";

const useAuth = () => {
  const { auth } = useContext(AuthContext); // dec for debug
  useDebugValue(auth, (auth) =>
    auth?.use ? "User Logged in" : "User Logged ed Out"
  );

  return useContext(AuthContext);
};

export default useAuth;
