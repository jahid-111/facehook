import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth?.user?.id) return;
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );

        setUser(response?.data.user);
        setPosts(response?.data.posts);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [api, auth?.user?.id]);

  if (loading) return <h3>Fetching Your Profile Data...</h3>;
  if (error) return <h3>Error fetching profile data: {error.message}</h3>;

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.firstName}</h1>
      ) : (
        <h3>No user data available</h3>
      )}
    </div>
  );
};

export default Profile;
