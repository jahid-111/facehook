import Logo from "../../assets/images/logo.svg";
import HomeIcon from "../../assets/icons/home.svg";
import Notification from "../../assets/icons/notification.svg";
import { Link } from "react-router-dom";
import LogOut from "../auth/Logout";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

const Header = () => {
  const { state } = useProfile();

  const { auth } = useAuth();

  const user = state?.user ?? auth?.user;
  return (
    <div>
      <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
        <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link to="/">
            <img
              className="max-w-[100px] rounded-full lg:max-w-[130px]"
              src={Logo}
            />
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="btn-primary">
              <img src={HomeIcon} alt="Home" />
              Home
            </Link>
            <button className="icon-btn">
              <img src={Notification} alt="Notification" />
            </button>
            <LogOut></LogOut>
            <button className="flex-center !ml-8 gap-3">
              <span className="text-lg font-medium lg:text-xl">
                {user?.firstName} {user?.lastName}
              </span>
              <img
                className="max-h-[32px] rounded-full max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
                alt={user?.firstName}
              />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
