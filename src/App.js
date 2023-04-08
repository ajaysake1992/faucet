import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import { useCallback } from "react";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [account, setAccounts] = useState(null);
  const [balance, setBalance] = useState(0);
  const [shouldReload, reload] = useState(false);

  const reloadEffect = useCallback(() => {
    reload(!shouldReload);
  }, [shouldReload]);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Faucet", provider);
      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
        });
      } else {
        // if the provider is not detected, detectEthereumProvider resolves to null
        console.error("Please install MetaMask!");
      }
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const fetchContractBalance = async () => {
      const { web3, contract } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };
    web3Api.web3 && fetchContractBalance();
  }, [web3Api, shouldReload]);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccounts(accounts[0]);
    };
    console.log(web3Api.web3);
    web3Api.web3 && getAccounts();
  }, [web3Api.web3]);

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api;
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });
    reloadEffect();
  }, [web3Api, account, reloadEffect]);

  const withdrawFunds = async () => {
    const { contract, web3 } = web3Api;
    const withdrawAmount = web3.utils.toWei("0.1", "ether");
    await contract.withdraw(withdrawAmount, {
      from: account,
    });
    reloadEffect();
  };

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="is-flex is-align-items-center">
            <span className="mr-2">
              <strong>Account:</strong>
            </span>
            {account ? (
              <div>{account}</div>
            ) : (
              <button
                className="button is-info"
                onClick={() => {
                  web3Api.provider.request({ method: "eth_requestAccounts" });
                }}
              >
                Connect wallet
              </button>
            )}
          </div>
          <div className="balance-view is-size-2 mb-4 my-4">
            Current Balance: <strong>{balance}</strong> ETH
          </div>
          <button className="button is-primary mr-2" onClick={addFunds}>
            Donate 1eth
          </button>
          <button className="button is-link is-outlined"
          onClick={withdrawFunds}>Withdraw 0.1eth</button>
        </div>
      </div>
    </>
  );
}

export default App;
