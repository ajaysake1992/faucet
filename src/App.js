import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const loadProvider = async () => {
      // with metamask we have access to window.ethereum and window.web3 as ot injects this in browser
      // client/mm injects some global API to perform transaction to API.
      console.log(window.ethereum);
      console.log(window.web3);
    }
    loadProvider();
  },[]);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="balance-view is-size-2">
             Current Balance: <strong>10</strong> ETH
          </div>
          <button className="btn mr-2"
            onClick={ async() => {
              const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
              console.log(accounts);
            }}>Enable ethereum</button>
          <button className="btn mr-2">Donate</button>
          <button className="btn">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
