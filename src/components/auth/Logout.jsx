import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/icons/logout.svg";
import useAuth from "../../hooks/useAuth";

const LogOut = () => {
  const navigateLogout = useNavigate();
  const { setAuth } = useAuth();
  function handleLogout() {
    setAuth({}); //reset User
    navigateLogout("/login");
  }

  return (
    <button onClick={handleLogout} className="icon-btn">
      <img src={LogoutIcon} alt="Logout" />
    </button>
  );
};

export default LogOut;
