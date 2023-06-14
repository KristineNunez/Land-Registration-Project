import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ContractDataContext } from './contexts/contract-data';
import { AccountDataContextProvider } from './contexts/account-data';

import Login from './pages/Login';
import LandRegForm from './pages/LandRegForm';
import MLAppForm from './pages/MLAppForm';
import MPayForm from './pages/MPayForm';
import LPayForm from './pages/LPayForm';
import BuyForm from './pages/BuyForm';
import SellForm from './pages/SellForm';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
import Transactions from './pages/Transactions';
import SidebarLayout from './layouts/SidebarLayout';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <ContractDataContext>
        <AccountDataContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<SidebarLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/landregform" element={<LandRegForm />} />
            <Route path="/mlappform" element={<MLAppForm />} />
            <Route path="/lpayform" element={<LPayForm />} />
            <Route path="/mpayform" element={<MPayForm />} />
            <Route path="/buyform" element={<BuyForm />} />
            <Route path="/sellform" element={<SellForm />} />
          </Routes>
        </AccountDataContextProvider>
      </ContractDataContext>
    </BrowserRouter>
  );
}

export default App;
