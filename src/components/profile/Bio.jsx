import useProfile from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

const Bio = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const [bio, setBio] = useState(state?.bio?.bio || "");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (state?.user?.bio) {
      setBio(state.user.bio);
    }
  }, [state?.user?.bio]);

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }
      setEdit(false);
    } catch (error) {
      console.log("Please Try Agin");
    }
  };

  return (
    <>
      <div className="mt-10 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          {!edit ? (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {state?.user.bio}
            </p>
          ) : (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              cols={55}
              className=" p-3 text-gray-600 bg-slate-300 text-lg rounded-md"
            ></textarea>
          )}
        </div>

        {!edit ? (
          <button
            onClick={() => setEdit(true)}
            className="flex-center h-7 w-7 rounded-full"
          >
            <img src={EditIcon} alt="Edit" />
          </button>
        ) : (
          <button
            onClick={handleBioEdit}
            className="flex-center bg-green-800 h-7 w-7 px-8 py-4 rounded-sm"
          >
            Save
          </button>
        )}
      </div>
    </>
  );
};

export default Bio;
