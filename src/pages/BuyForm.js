import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connectWallet } from '../utils/wallet';
import { useNavigate } from 'react-router-dom';
import AccountContext from '../contexts/account-data';
import ContractContext from '../contexts/contract-data';

import { NavLink } from 'react-router-dom';
import '../navbar.css';
import { useForm } from 'react-hook-form';

export default function BuyForm() {
  const navigate = useNavigate();
  const contract = useContext(ContractContext);
  const account = useContext(AccountContext);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      contract.fetchStorage();
    })();
    account.resetAccountData();
  }, []);

  // watch for changes in the account data context then navigate to dashboard if the user is authenticated and admin if the user is an admin
  useEffect(() => {
    console.log(account);
    if (account.authenticated) {
      if (account.type === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [account, navigate]);

  const connect = async () => {
    console.log('test');
    setLoading(true);
    try {
      await connectWallet();
      await account.fetchAccountData(true, contract.storage);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <>
      <nav className="navbar">
        {/* <div className="container"> */}
        <div className="logo">
          <NavLink to="/Landing">LANDREG</NavLink>
        </div>

        <div className="menu-icon" onClick={handleShowNavbar}>
          ☰
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/LandRegForm">Land Registration</NavLink>
            </li>
            <li>
              <NavLink to="">Mortgage</NavLink>
              {/* dropdown */}
              <ul className="dropdown">
                <li className="sub">
                  <NavLink to="/MLAppForm">Application</NavLink>
                </li>
                <li className="sub">
                  <NavLink to="/MPayForm">Payment</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="">Lease</NavLink>
              {/* dropdown */}
              <ul className="dropdown">
                <li className="sub">
                  <NavLink to="/MLAppForm">Application</NavLink>
                </li>
                <li className="sub">
                  <NavLink to="/LPayForm">Payment</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/BuyForm">Buy</NavLink>
            </li>
            <li>
              <NavLink to="/SellForm">Sell</NavLink>
            </li>
          </ul>
        </div>
        {/* </div> */}
      </nav>

      {/* DITO ILALAGAY YUNG FORM */}
      <div className="form_content">
        {/* Buy Form */}
        <div className="form_header">Buy Form</div>
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
          <p>
            {' '}
            {'Registration Number: '}
            <input
              {...register('registrationNumber')}
              placeholder="Registration Number"
              required
            />
          </p>
          <p>
            {' '}
            {'Amount to Pay: '}
            <input
              {...register('amountToPay')}
              placeholder="Amount to Pay (Tezos)"
              type="number"
              required
            />
          </p>
          <p>{data}</p>
          <p>
            <input type="submit" />
          </p>
        </form>
      </div>
    </>
  );
}
