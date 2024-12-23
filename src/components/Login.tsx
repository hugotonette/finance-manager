import { useState } from "react";
import { userList } from "../common/mockUsers";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // mock credential validation
    const hasUser = userList.find(
      (u) => u.username === username && u.password === password
    );

    if (hasUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(hasUser));
      navigate("/");
    } else {
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center gap-5">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 max-w-xs w-9/12 mx-auto justify-center items-center"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input p-2 bg-transparent border-2 rounded-lg border-gray-800 dark:border-gray-100"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input p-2 bg-transparent border-2 rounded-lg border-gray-800 dark:border-gray-100"
          />
          <button
            type="submit"
            className="w-fit rounded-lg py-2 px-6 shadow-md hover:shadow-none text-white bg-gray-800 hover:bg-opacity-90 dark:text-black dark:bg-gray-100 dark:hover:bg-opacity-90"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
