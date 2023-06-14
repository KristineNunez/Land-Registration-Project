import React, { useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AccountContext from '../contexts/account-data';
import ContractContext from '../contexts/contract-data';

import { NavLink } from 'react-router-dom';
import '../navbar.css';
import '../forms.css';
import { useForm } from 'react-hook-form';

export default function LandRegForm() {
  const contract = useContext(ContractContext);
  const account = useContext(AccountContext);
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');
  // watch for changes in the account data context then navigate to dashboard if the user is authenticated and admin if the user is an admin

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
                  <NavLink to="/MLPayForm">Payment</NavLink>
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
                  <NavLink to="/MLPayForm">Payment</NavLink>
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
        <div className="form_header">Land Registration Form</div>
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
          <p>
            {'Land Size: '}
            <input
              {...register('size')}
              placeholder="Size of Land (sq. m)"
              type="number"
              required
            />
          </p>

          <p>
            {'Tax Value: '}
            <input
              {...register('taxValue')}
              placeholder="Tax Value (Tezos)"
              type="number"
              required
            />
          </p>

          <p>
            {'Location: '}
            <input {...register('location')} placeholder="Location" required />
          </p>

          <p>
            {'Image: '}
            <input
              {...register('image')}
              placeholder="image"
              type="file"
              required
            />
          </p>

          <p className="submit_button">
            <input type="submit" />
          </p>
          <p>{data}</p>
        </form>
      </div>
    </>
  );
}
