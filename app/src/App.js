import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Escrow from "./Escrow";
import Contract from "./components/Contracts/Contract";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();

  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState(
    JSON.parse(localStorage.getItem("contracts") || [])
  );

  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }
    getAccounts();
  }, [account]);

  return (
    <div className="contract__root">
      <Contract signer={signer} setEscrows={setEscrows} sender={account} />

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>
        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} signer={signer} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
