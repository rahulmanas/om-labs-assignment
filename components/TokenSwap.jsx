import React, { useEffect, useState } from "react";
import {
  Token,
  TokenAmount,
  Trade,
  TradeType,
  Route,
  Fetcher,
  TradeOptions,
} from "@uniswap/sdk";
import { useGlobal } from "../hooks/useGlobal";
import { formatEther } from "@ethersproject/units";

const TokenSwap = ({ isActive, balance }) => {
  const { setShowModal } = useGlobal();
  const [fromTokenAddress, setFromTokenAddress] = useState("");
  const [toTokenAddress, setToTokenAddress] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [maxVal, setMaxVal] = useState(0);

  const handleFromTokenChange = (e) => {
    setFromTokenAddress(e.target.value);
  };

  const handleToTokenChange = (e) => {
    setToTokenAddress(e.target.value);
  };

  const handleFromAmountChange = (e) => {
    setFromAmount(e.target.value);
    calculateToAmount();
  };

  const handleToAmountChange = (e) => {
    setToAmount(e.target.value);
    calculateFromAmount();
  };

  const calculateToAmount = async () => {
    if (fromTokenAddress && toTokenAddress && fromAmount) {
      const fromToken = new Token(1, fromTokenAddress, 18);
      const toToken = new Token(1, toTokenAddress, 18);
      const pair = await Fetcher.fetchPairData(fromToken, toToken);
      const route = new Route([pair], fromToken);
      const trade = new Trade(
        route,
        new TokenAmount(fromToken, fromAmount),
        TradeType.EXACT_INPUT
      );
      setToAmount(trade.outputAmount.toSignificant(6));
    }
  };

  const calculateFromAmount = async () => {
    if (fromTokenAddress && toTokenAddress && toAmount) {
      const fromToken = new Token(1, fromTokenAddress, 18);
      const toToken = new Token(1, toTokenAddress, 18);
      const pair = await Fetcher.fetchPairData(fromToken, toToken);
      const route = new Route([pair], fromToken);
      const trade = new Trade(
        route,
        new TokenAmount(toToken, toAmount),
        TradeType.EXACT_OUTPUT
      );
      setFromAmount(trade.inputAmount.toSignificant(6));
    }
  };

  useEffect(() => {
    if (balance) {
      const resp = Number(formatEther(balance[0])).toFixed(2);
      setMaxVal(resp);
    }
  }, [balance]);

  return (
    <div className="rounded-xl p-2 md:p-8 border-1 border-boundary border-solid bg-swap-box w-full md:w-1/2 mx-auto mt-12 space-y-4">
      <h2 className="text-white text-xl">Swap</h2>

      <div>
        <div className="bg-swap-input-box border-1 border-solid border-entire-bg h-24 rounded-md hfTphi">
          <div className="pt-4 grid grid-cols-4 md:grid-cols-3 items-center text-white">
            <div className="col-span-2">
              <input
                type="text"
                className="bg-swap-input-box h-16 w-full outline-none text-white text-5xl px-4"
                value={fromAmount}
                onChange={handleFromAmountChange}
                placeholder="0"
              />
            </div>
            <div className="rounded-full col-span-2 md:col-span-1 cursor-pointer bg-swap-token py-2 px-4 ml-auto mr-1 md:mr-4">
              <div className="space-x-2 flex items-center w-max">
                <p>MAT</p>
                <p className="text-xl">POL</p>
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="sc-3zewi2-8 cnYyzy"
                >
                  <path
                    d="M0.97168 1L6.20532 6L11.439 1"
                    stroke="#AEAEAE"
                  ></path>
                </svg>
              </div>
              {maxVal && (
                <div className="flex justify-between">
                  <p>Ξ {maxVal}</p>
                  <button
                    className="text-blue-400"
                    onClick={() => setFromAmount(maxVal)}
                  >
                    Max
                  </button>
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>
        <div class="sc-11ce2lf-2 fcplJw">
          <div
            data-testid="swap-currency-button"
            color="#FFFFFF"
            class="sc-1es900k-0 jhKFEw"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5D6785"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
        </div>
        <div className="bg-swap-input-box border-1 border-solid border-entire-bg h-24 rounded-md hfTphi">
          <div className="pt-4 grid grid-cols-4 md:grid-cols-3 items-center text-white">
            <div className="col-span-2">
              <input
                type="text"
                className="bg-swap-input-box h-16 w-full outline-none text-white text-2xl md:text-5xl px-4"
                value={toAmount}
                onChange={handleToAmountChange}
                placeholder="0"
              />
            </div>
            <div className="rounded-full col-span-2 md:col-span-1 cursor-pointer bg-swap-token py-2 px-4 space-x-2 flex items-center w-max ml-auto mr-1 md:mr-4">
              <p>MAT</p>
              <p className="text-xl">POL</p>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="sc-3zewi2-8 cnYyzy"
              >
                <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path>
              </svg>
            </div>
          </div>
          <div></div>
        </div>
        <div className="pt-4">
          <button
            onClick={() => setShowModal(true)}
            className={`w-full py-4 rounded-xl ${
              isActive ? "bg-red-400" : "btn-connect"
            }`}
          >
            {isActive ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenSwap;
