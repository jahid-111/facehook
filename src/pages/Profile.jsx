import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";

const Profile = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();
  useEffect(() => {
    if (!auth?.user?.id) return;
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );

        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED_DONE,
            data: response.data,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        }); //note  
      }
    };

    fetchProfile();
  }, [api, auth?.user?.id, dispatch]);

  if (state?.loading) return <h3>Fetching Your Profile Data...</h3>;
  if (state?.error)
    return <h3>Error fetching profile data: {state?.message}</h3>;

  return (
    <>
      {state.user ? (
        <div>
          <h1>Welcome, {state.user.firstName}</h1>
          <h1> {state.user.lastName}</h1>
          <h1>Posts: {state.post.length}</h1>
        </div>
      ) : (
        <h3>No user data available</h3>
      )}
    </>
  );
};

export default Profile;
