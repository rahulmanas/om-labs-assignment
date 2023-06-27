import web3 from "../../utils/web3";
import { useEffect, useState } from "react";

export default function OmLabs() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      console.log("====================================");
      console.log(accounts, "acc");
      console.log("====================================");
      setAccount(accounts[0]);
    };

    fetchAccount();
  }, [account]);

  useEffect(() => {
    if (account) {
      const fetchBalance = async () => {
        const balance = await web3.eth.getBalance(account);
        setBalance(web3.utils.fromWei(balance, "ether"));
      };

      fetchBalance();
    }
  }, [account]);

  return (
    <div className="text-black">
      <h1>My DApp</h1>
      <p>Account: {account}</p>
      <p>Balance: {balance} ETH</p>
    </div>
  );
}
