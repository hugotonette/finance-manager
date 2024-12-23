import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";

const App = () => {
  // const [loggedInUser] = useState<string | null>(
  //   localStorage.getItem("loggedInUser")
  // );

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
        <Header />
        {/* <Routes>{!loggedInUser ? <Navigate to="/" /> : <Dashboard />}</Routes> */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
