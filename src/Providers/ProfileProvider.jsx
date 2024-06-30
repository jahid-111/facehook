import { useReducer } from "react";
import { initialState, profileReducer } from "../reducers/ProfileReducers";
import { ProfileContext } from "../context";

// eslint-disable-next-line react/prop-types
const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
