import useProfile from "../../hooks/useProfile";
import PostList from "../posts/PostList";

const MyPosts = () => {
  const { state } = useProfile();
  const posts = state.post;

  console.log("Posts:", posts);

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">
        Your Posts {posts.length}
      </h4>
      <PostList posts={posts}></PostList>
    </>
  );
};

export default MyPosts;
