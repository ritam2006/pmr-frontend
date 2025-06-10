"use client";

import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import PortfolioCard from "../components/PortfolioCard";
import { getTokenFromCookie } from "../utils/getToken";
import LoadingIcon from "../components/LoadingIcon";

type Portfolio = {
  id: number;
  name: string;
  assets: { ticker: string; weight: number };
  start: Date;
  end: Date;
  sharpe: number;
  valueAtRisk: number;
};

export default function Home() {
  const [userPortfolios, setUserPortfolios] = useState<Portfolio[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const token = await getTokenFromCookie();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/userPortfolios`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }

        const data = await res.json();
        setUserPortfolios(data);
      } catch (err) {
        console.error("Failed to load user portfolios:", err);
        setError("Failed to load user portfolios");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <main className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl">Add New Portfolio</h2>
        <a 
          href="/home/portfolio" 
          className="grid w-48 aspect-square bg-background-2 border-2 border-accent hover:bg-accent 
            ease-in-out duration-200 rounded-lg text-xl font-bold"
        >
          <div className="place-self-center flex items-center gap-1">
            <MdAdd className="text-2xl" />
            <p>Add Portfolio</p>
          </div>
        </a>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl">Your Portfolios</h2>
        {loading ? 
          <LoadingIcon className="w-32 h-32 mt-12 border-4 border-accent mx-auto" />
          :
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {userPortfolios.map((portfolio, index) => (
              <PortfolioCard
                key={index}
                id={portfolio.id}
                name={portfolio.name}
                assets={portfolio.assets}
                start={new Date(portfolio.start)}
                end={new Date(portfolio.end)}
                sharpe={portfolio.sharpe}
                valueAtRisk={portfolio.valueAtRisk}
              />
            ))}
          </div>
        }
      </div>
    </main>
  );
}