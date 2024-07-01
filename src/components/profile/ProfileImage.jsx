import useProfile from "../../hooks/useProfile";

const ProfileImage = () => {
  const { state } = useProfile();

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="h-[220px] w-[220px]"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user.avatar}`}
        alt={state?.user.firstName}
      />

      <button className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80">
        <img src="" />
      </button>
    </div>
  );
};

export default ProfileImage;