import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import BottomOverlay from "./BottomOverlay";

const Landing = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedInUser");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [loginSelect, setLoginSelect] = useState(false);

  const selectLogin = () => {
    setLoginSelect(true);
    setOverlayOpen(true);
  };

  const selectRegistrer = () => {
    setLoginSelect(false);
    setOverlayOpen(true);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="flex flex-col items-center gap-4 justify-center h-[80vh]">
        <div className="flex flex-col w-full p-8 items-center text-gray-800 dark:text-gray-100">
          <h1 className="text-4xl font-bold font-serif">Welcome</h1>
          <span className="text-center mt-4">
            <p>Take control of your finances with CashFlow</p>
            <p>your personal finance manager.</p>
          </span>
        </div>
        <div className="space-x-4">
          <button
            onClick={selectLogin}
            className="px-2 py-1 border-2 rounded-md border-gray-800 text-black dark:border-gray-100 dark:text-white"
          >
            Login
          </button>
          <button
            onClick={selectRegistrer}
            className="px-2 py-1 border-2 rounded-md border-gray-800 text-black dark:border-gray-100 dark:text-white"
          >
            Register
          </button>
        </div>
      </div>
      <BottomOverlay
        overlayOpen={overlayOpen}
        setOverlayOpen={setOverlayOpen}
        content={loginSelect ? <Login /> : <Register />}
      />
    </>
  );
};

export default Landing;
