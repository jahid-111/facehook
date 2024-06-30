import ProfileProvider from "../Providers/ProfileProvider";
import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.authToken ? (
        <>
          <ProfileProvider>
            <Header />
            <main className=" mx-auto max-w-[1020px] py-8">
              <div className="container">
                <Outlet></Outlet>
              </div>
            </main>
          </ProfileProvider>
        </>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </>
  );
};

export default PrivateRoutes;
