import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "[]");
  const isLoggedIn = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4 h-11/12 text-gray-800 dark:text-gray-100">
        <div className="p-10 my-6 rounded-full w-32 h-32 text-center text-gray-800 bg-red-200 drop-shadow-md">
          Profile image
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">
            {user.name} {user.surname}
          </h1>
          <p className="text-lg font-mono">{user.username}</p>
          <p className="text-lg font-mono">{user.email}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
