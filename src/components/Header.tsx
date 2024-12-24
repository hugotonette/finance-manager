import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 py-4 bg-gray-100 dark:bg-gray-800 shadow-lg z-40">
      <div className="flex items-center space-x-4">
        <ThemeSwitcher />
      </div>
      <div className="flex items-center w-max">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          CashFlow
        </h1>
      </div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 rounded-md text-gray-800 dark:text-gray-100 focus:outline-none"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6l16 0" />
          <path d="M4 12l16 0" />
          <path d="M4 18l16 0" />
        </svg>
      </button>

      {/* darken overlay */}
      <div
        className={`fixed top-0 left-0 bg-black ${
          isMenuOpen
            ? "opacity-50 right-0 bottom-0 transition-opacity"
            : "opacity-0"
        }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Side Menu */}
      <nav
        className={`flex flex-col gap-5 pt-5 fixed top-0 -right-1 w-64 h-full text-gray-800 bg-gray-100 dark:text-gray-100 dark:bg-gray-800 shadow-xl z-50 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex px-3 flex-row justify-between">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 mt-0 mb-auto"
          >
            X
          </button>
        </div>
        <div className="flex justify-center items-center w-full">
          <button
            onClick={() => {
              navigate("/profile");
              setIsMenuOpen(false);
            }}
            className="p-5 rounded-full w-24 h-24 bg-red-200 drop-shadow-md"
          >
            Profile
          </button>
        </div>
        <ul className="flex flex-col gap-4 items-end p-4 pr-10 space-y-4 text-lg">
          <li>
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="hover:underline"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate("/about");
                setIsMenuOpen(false);
              }}
              className="hover:underline"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate("/contact");
                setIsMenuOpen(false);
              }}
              className="hover:underline"
            >
              Contact Us
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="hover:underline font-bold text-red-500"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
