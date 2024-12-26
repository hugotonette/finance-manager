/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
  });
  const [userCreated, setUserCreated] = useState(false);

  const handleRegister = () => {
    setUserCreated(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {userCreated ? (
          <p className="text-green-500">
            This is a work in progress. User was
            <span className="font-medium underline"> NOT</span> created.
          </p>
        ) : (
          <></>
        )}
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
              className="input p-2 bg-transparent border-2 rounded-lg border-gray-800 dark:border-gray-100"
            />
          ))}
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

export default Register;
