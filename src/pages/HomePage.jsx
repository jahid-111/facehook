import { Link } from "react-router-dom";
// import Hea der from "../components/common/Header";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <div>
      <h3>HOME PAGEE</h3>
      <Link to="/me"> go to Profile Page</Link>
    </div>
  );
};

export default HomePage;
