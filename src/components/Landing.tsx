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

  // const toggleOverlay = () => {
  //   setOverlayOpen(!overlayOpen);
  // };

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 font-serif">
          Welcome
        </h1>
        <div className="mt-6 space-x-4">
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

      {/* darken overlay */}
      {/* <div
        className={`fixed top-0 left-0 bg-black ${
          overlayOpen
            ? "opacity-50 right-0 bottom-0 transition-opacity"
            : "opacity-0"
        }`}
        onClick={toggleOverlay}
      /> */}

      {/* Bottom menu */}
      {/* <div
        className={`flex flex-col fixed bottom-0 w-screen rounded-tl-3xl p-6 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 h-[70%] z-10 shadow-2xl transition-transform transform ${
          overlayOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full h-fit flex flex-row justify-end items-end gap-6">
          <button onClick={toggleOverlay} className="px-3 py-1 rounded-full">
            X
          </button>
        </div>
        <div>{loginSelect ? <Login /> : <Register />}</div>
      </div> */}
    </>
  );
};

export default Landing;
