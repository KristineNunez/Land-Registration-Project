import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connectWallet } from '../utils/wallet';
import { useNavigate } from 'react-router-dom';
import AccountContext from '../contexts/account-data';
import ContractContext from '../contexts/contract-data';
import Spinner from '../components/Spinner';
import '../navbar.css';

export default function Login() {
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

  useEffect(() => {
    if (account.authenticated) {
      navigate('/dash');
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

  return (
    <main className="bg-[#8ad2ce] min-h-screen">
      <div className="container">
        <div className="grid content-center w-full min-h-screen grid-flow-col grid-cols-2 gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-4xl font-bold text-dark">
              Land Registration Online
            </div>
            <div className="flex flex-col w-full gap-4 px-8 py-10 bg-white border border-gray-200 rounded-xl lg:max-w-xl">
              <h2 className="text-2xl font-medium text-center text-black">
                Connect your wallet to continue
              </h2>
              <button
                type="button"
                className="flex justify-center w-full px-4 py-2 text-xl font-medium tracking-wide transition-colors duration-200 transform border-2 rounded-full text-primary border-primary hover:bg-primary hover:text-white focus:outline-none focus:bg-primary"
                onClick={connect}
              >
                {loading ? <Spinner /> : 'Connect'}
              </button>
            </div>
          </div>
          <img src="/house.svg" alt="house" />
        </div>
      </div>
    </main>
  );
}
