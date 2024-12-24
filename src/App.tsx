import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import Profile from "./components/Profile";

const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
