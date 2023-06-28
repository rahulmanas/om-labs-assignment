import React from "react";
import { useModalManager } from "../hooks/useModalManager";

export default function ChooseToken() {
  const tokenLists = [
    {
      id: 1,
      name: "Tether",
      shortName: "USDT",
      address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      image_url:
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0xc2132D05D31c914a87C6611C10748AEb04B58e8F/logo.png",
    },
    {
      id: 2,
      name: "USD Coin",
      shortName: "USDC",
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      image_url:
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png",
    },
    {
      id: 3,
      name: "Polygon",
      shortName: "MATIC",
      address: "0x0000000000000000000000000000000000001010",
      image_url:
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x0000000000000000000000000000000000001010/logo.png",
    },
    {
      id: 4,
      name: "Wrapped Bitcoin",
      shortName: "WBTC",
      address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
      image_url:
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6/logo.png",
    },
  ];
  const { setSelectedToToken, handleTokenModal }: any = useModalManager();

  return (
    <div>
      <div>
        {tokenLists.map((tokenList) => {
          return (
            <div
              key={tokenList.id}
              onClick={() => {
                setSelectedToToken(tokenList);
                handleTokenModal(false);
              }}
              className="flex justify-between py-2 px-4 items-center hover:bg-swap-input-box rounded-xl space-y-2"
            >
              <div className="flex space-x-2 items-center ">
                <img
                  src={tokenList.image_url}
                  alt={tokenList.name}
                  className="h-4 w-4 rounded-full"
                />
                <p>{tokenList.name}</p>
              </div>
              <p>{tokenList.shortName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
