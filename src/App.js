import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ContractDataContext } from "./contexts/contract-data";
import { AccountDataContextProvider } from "./contexts/account-data";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Transaction from "./pages/Transaction";
import { ToastContainer } from "react-toastify";
import Landing from "./pages/Landing";
import LandRegForm from "./pages/LandRegForm";
import MLAppForm from "./pages/MLAppForm";
import MPayForm from "./pages/MPayForm";
import LPayForm from "./pages/LPayForm";
import BuyForm from "./pages/BuyForm";
import SellForm from "./pages/SellForm";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <ContractDataContext>
        <AccountDataContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/landregform" element={<LandRegForm />} />
            <Route path="/mlappform" element={<MLAppForm />} />
            <Route path="/lpayform" element={<LPayForm />} />
            <Route path="/mpayform" element={<MPayForm />} />
            <Route path="/buyform" element={<BuyForm />} />
            <Route path="/sellform" element={<SellForm />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/landing" element={<Landing />} />
            <Route
              path="/transaction/:transactionId"
              element={<Transaction />}
            />
          </Routes>
        </AccountDataContextProvider>
      </ContractDataContext>
    </BrowserRouter>
  );
}

export default App;
