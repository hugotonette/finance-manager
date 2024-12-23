/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleRegister = () => {
    // const users = JSON.parse(localStorage.getItem("users") || "[]");
    alert("User registered!");
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-bold mb-4 text-white dark:text-black">
          Register
        </h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4 max-w-xs w-9/12 mx-auto justify-center items-center"
        >
          {["username", "password", "name", "surname", "email"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(formData as any)[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="input p-2 bg-transparent border-2 rounded-lg border-gray-100 dark:border-gray-800"
            />
          ))}
          <button
            type="submit"
            className="w-fit rounded-lg py-2 px-6 shadow-md hover:shadow-none text-black bg-gray-100 hover:bg-opacity-90 dark:text-white dark:bg-gray-800 dark:hover:bg-opacity-90"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
