import { Link } from "react-router-dom";
// import Hea der from "../components/common/Header";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <div>
      <h3 className=" mb-5">HOME PAGE</h3>

      <Link className=" bg-red-400 px-4 py-4" to="/me">
        {" "}
        go to Profile Page
      </Link>
    </div>
  );
};

export default HomePage;
