import ThreeDotsIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import TimeIcon from "../../assets/icons/time.svg";
import getDateHowLongFromNow from "../../utils";
import useAvatar from "../../hooks/useAvatar";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
// eslint-disable-next-line react/prop-types
const PostHeader = ({ post }) => {
  const [showAction, setShowAction] = useState(false);
  const { avatarURL } = useAvatar(post);

  const { auth } = useAuth();

  const isMe = post?.author?.id === auth?.user?.id;

  const { dispatch } = usePost();
  const { api } = useAxios();

  const toggleAction = () => {
    setShowAction(!showAction);
  };

  const handleDeleteThisPost = async (e) => {
    console.log(e);
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}`
      );
      if (response.status === 200) {
        dispatch({ type: actions.post.POST_DELETED, data: post.id });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.errors });
    }
  };

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className=" h-16 w-16 rounded-full "
          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {`${getDateHowLongFromNow(post?.createAt)}`}
            </span>
          </div>
        </div>
      </div>

      <div className="relative ">
        {isMe && (
          <button onClick={toggleAction}>
            <img src={ThreeDotsIcon} alt="3dots of Action" />
          </button>
        )}

        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={EditIcon} alt="Edit" />
              {"Edit"}
            </button>
            <button
              onClick={handleDeleteThisPost}
              className="action-menu-item hover:text-red-500"
            >
              <img src={DeleteIcon} alt="Delete" />
              {"Delete"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
