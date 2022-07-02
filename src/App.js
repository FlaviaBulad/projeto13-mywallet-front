import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import SignUpPage from "./Components/SignUp/SignUpPage";
import BalancePage from "./Components/Balance/BalancePage";
import UserContext from "./contexts/UserContext";
import "./styles/reset.css";
import "./styles/index.css";

function App() {
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up/" element={<SignUpPage />} />
          <Route path="/balance/" element={<BalancePage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
