import { useEffect, useReducer } from "react";
import { postReducer, initialState } from "../reducers/PostReducer";
import useAxios from "../hooks/useAxios";
import PostList from "../components/posts/PostList";
import { actions } from "../actions";
import { Link } from "react-router-dom";
import usePost from "../hooks/usePost";
import NewPost from "../components/posts/NewPost";
import PostEntry from "../components/posts/PostEntry";

const HomePage = () => {
  const { state, dispatch } = usePost();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );

        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_FETCHED_DONE,
            data: response.data,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };
    fetchPost();
  }, [api, dispatch]);

  if (state.loading) {
    return <h3>Loading...</h3>;
  }
  if (state.error) {
    return <h3>Error: {state.error}</h3>;
  }

  return (
    <>
      <Link to={"/me"}>
        <p className=" text-green-400 font-semibold hover:text-4xl underline">
          Go To Profile
        </p>
      </Link>
      <NewPost post={state?.posts}></NewPost>
      <PostList posts={state?.posts} />
    </>
  );
};

export default HomePage;
