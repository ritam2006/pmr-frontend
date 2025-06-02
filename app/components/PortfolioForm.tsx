"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Asset from "./Asset";
import { getTokenFromCookie } from "../utils/getToken";
import LoadingIcon from "./LoadingIcon";

type PortfolioFormProps = {
  tickers: string[];
};

export default function PortfolioForm({ tickers }: PortfolioFormProps) {
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioValue, setPortfolioValue] = useState("");
  const [assets, setAssets] = useState([{ ticker: tickers[0], weight: "" }]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const updateAsset = (index: number, field: "ticker" | "weight", value: string) => {
    const updated = [...assets];
    updated[index][field] = value;
    setAssets(updated);
  };

  const addAsset = () => {
    setAssets([...assets, { ticker: tickers[0], weight: "" }]);
  };

  const removeAsset = (index: number) => {
    if (assets.length <= 1) return;
    const updated = [...assets];
    updated.splice(index, 1);
    setAssets(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (portfolioName.trim().length === 0) {
      setError("Portfolio must have a name.");
      setIsLoading(false);
      document.getElementById("error")?.scrollIntoView();
      return;
    }

    const parsedAssets = assets.map((asset) => ({
      ticker: asset.ticker,
      weight: parseFloat(asset.weight),
    }));

    const tickersOnly = parsedAssets.map((a) => a.ticker);
    const uniqueTickers = new Set(tickersOnly);
    if (uniqueTickers.size !== tickersOnly.length) {
      setError("Each asset must have a unique ticker.");
      setIsLoading(false);
      document.getElementById("error")?.scrollIntoView();
      return;
    }

    const hasInvalid = parsedAssets.some(
      (a) => isNaN(a.weight) || a.weight < 0 || a.weight > 1
    );

    if (hasInvalid) {
      setError("Each asset must have a valid weight between 0 and 1.");
      setIsLoading(false);
      document.getElementById("error")?.scrollIntoView();
      return;
    }

    const totalWeight = parsedAssets.reduce((sum, a) => sum + a.weight, 0);
    const epsilon = 0.001;

    if (Math.abs(totalWeight - 1) > epsilon) {
      setError(`Total weight must equal 1. Currently: ${totalWeight.toFixed(2)}`);
      setIsLoading(false);
      document.getElementById("error")?.scrollIntoView();
      return;
    }

    const portfolio = {
      "name": portfolioName,
      "currentValue": portfolioValue,
      "assets": assets
    }

    const token = await getTokenFromCookie();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/analyze`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(portfolio),
      credentials: "include"
    });

    if (!res.ok) {
      setIsLoading(false);
      console.error(`HTTP error! status: ${res.status}`);
    }

    const id: number = await res.json();
    router.push(`/home/portfolio/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-lg flex flex-col items-stretch gap-4">
      <h1 className="text-center text-3xl md:text-4xl">Create a Mock Portfolio</h1>
      <h2 className="text-center text-gray-500 text-sm md:text-base">(We only allow you to select from top 50 companies.)</h2>
      <input 
        type="text" 
        placeholder="Portfolio Name"
        value={portfolioName}
        onChange={(e) => setPortfolioName(e.target.value)} 
      />
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
        <input
          type="number"
          step="1000"
          min="1000"
          placeholder="Portfolio Value"
          value={portfolioValue}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "" || Number(val) > 0) {
              setPortfolioValue(val);
            }
          }}
          className="!pl-8 w-full"
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Assets</p>
        <button
          type="button"
          onClick={addAsset}
          className="themed-button text-sm p-2"
        >
          + Add Asset
        </button>
      </div>

      {assets.map((asset, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <Asset
            tickers={tickers}
            selectedTicker={asset.ticker}
            weight={asset.weight}
            onChangeTicker={(val) => updateAsset(idx, "ticker", val)}
            onChangeWeight={(val) => updateAsset(idx, "weight", val)}
          />
          <button
            type="button"
            onClick={() => removeAsset(idx)}
            className="bg-red-600 hover:bg-red-500 rounded-lg text-background text-sm p-2"
            disabled={assets.length <= 1}
          >
            Remove
          </button>
        </div>
      ))}
      <button 
        className="themed-button h-10 p-2 grid"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingIcon />
        ) : "Analyze"}
      </button>
      {error && <p id="error" className="text-red-600 text-center">{error}</p>}
    </form>
  );
}