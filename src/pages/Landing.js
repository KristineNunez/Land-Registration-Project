import React, { useContext, useEffect, useState } from "react";
import Options from "../components/Options";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { connectWallet } from "../utils/wallet";
import { useNavigate } from "react-router-dom";
import AccountContext from "../contexts/account-data";
import ContractContext from "../contexts/contract-data";
import Logo from "../components/Logo";
import Spinner from "../components/Spinner";

export default function Landing() {
  const navigate = useNavigate();
  const contract = useContext(ContractContext);
  const account = useContext(AccountContext);

  const [loading, setLoading] = useState(false);

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
      if (account.type === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [account, navigate]);

  const connect = async () => {
    console.log("test");
    setLoading(true);
    try {
      await connectWallet();
      await account.fetchAccountData(true, contract.storage);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <nav>
        <a href="">
          <div class="logo">LANDREG</div>
        </a>
        <input type="checkbox" id="click" />
        <label for="click" class="menu-btn">
          <i class="fas fa-bars"></i>
        </label>
        <ul>
          <li>
            <a href="#">Land Registration</a>
          </li>
          <li>
            <a href="#">Mortgage</a>
          </li>
          <li>
            <a href="#">Lease</a>
          </li>
          <li>
            <a href="#">Buy</a>
          </li>
          <li>
            <a href="#">Sell</a>
          </li>
        </ul>
      </nav>

      {/* DITO ILALAGAY YUNG CONNECT WALLET */}
      <div class="content">
        <div className="content_main">Land Registration Online</div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col w-full gap-4 px-8 py-10 bg-white border border-gray-200 rounded-xl lg:max-w-xl">
            <h2 className="text-2xl font-medium text-center text-black">
              Connect your wallet to continue
            </h2>
            <form>
              <div className="mt-6">
                <button
                  type="button"
                  className="flex justify-center w-full px-4 py-2 font-medium tracking-wide transition-colors duration-200 transform border-2 rounded-full text-primary border-primary hover:bg-primary hover:text-white focus:outline-none focus:bg-primary text-xl"
                  onClick={connect}
                >
                  {loading ? <Spinner /> : "🌮 Connect"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
