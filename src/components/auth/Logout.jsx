import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/icons/logout.svg";

const LogOut = () => {
  const navigateLogout = useNavigate();

  function handleLogout() {
    navigateLogout("/login");
  }

  return (
    <button onClick={handleLogout} className="icon-btn">
      <img src={LogoutIcon} alt="Logout" />
    </button>
  );
};

export default LogOut;
