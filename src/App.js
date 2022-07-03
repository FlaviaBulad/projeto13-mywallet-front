import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./Components/Login/LoginPage";
import SignUpPage from "./Components/SignUp/SignUpPage";
import BalancePage from "./Components/Balance/BalancePage";
import IncomePage from "./Components/Balance/IncomePage";
import ExpensesPage from "./Components/Balance/ExpensesPage";

import UserContext from "./contexts/UserContext";

import "./styles/reset.css";
import "./styles/index.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up/" element={<SignUpPage />} />
          <Route path="/balance/" element={<BalancePage />} />
          <Route path="/income/" element={<IncomePage />} />
          <Route path="/expenses/" element={<ExpensesPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
