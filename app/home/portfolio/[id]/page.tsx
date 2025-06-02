import { getTokenFromCookie } from "@/app/utils/getToken";
import PortfolioGraph from "@/app/components/PortfolioGraph";
import PortfolioStatistic from "@/app/components/PortfolioStatistic";
import { notFound } from "next/navigation";

interface PortfolioPageProps {
  params: {
    id: string;
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  let portfolio;
  const id = params.id;
  const token = await getTokenFromCookie();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/fetchPortfolio`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id),
      credentials: "include"
    });

    if (!res.ok) {
      console.error(`HTTP error! Failed to save portfolio, status: ${res.status}`);
      notFound();
    }

    portfolio = await res.json();
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
    return <div className="text-red-500">Failed to load portfolio</div>
  }

  const statistics = [
    {
      statisticTitle: "Cumulative Return",
      statistic: (portfolio.cumulativeReturn * 100).toFixed(2) + "%",
      tip: "The total percentage gain or loss of your portfolio over time, including all profits and losses."
    },
    {
      statisticTitle: "Volatility",
      statistic: (portfolio.volatility * 100).toFixed(2) + "%",
      tip: "A measure of how much your portfolio's returns fluctuate. Higher volatility means higher risk and potential reward."
    },
    {
      statisticTitle: "Sharpe Coefficient",
      statistic: portfolio.sharpe.toFixed(2),
      tip: "Indicates risk-adjusted return. A higher Sharpe ratio means better returns relative to the risk taken."
    },
    {
      statisticTitle: "Value at Risk",
      statistic: "$" + portfolio.valueAtRisk.toFixed(2) * (-1),
      tip: "An estimate of how much you could lose in a worst-case scenario over a given time period with a certain confidence level."
    }
  ];

  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl">{portfolio.name}</h1>
        <p className="text-xl md:text-2xl">from {portfolio.username}</p>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl">Asset Distribution</h2>
        <div>
          {portfolio.assets.map((asset: any, index: number) => (
            <div className="flex text-lg md:text-xl gap-2" key={index}>
              <h3>{asset.ticker}: </h3>
              <p>{parseFloat(asset.weight) * 100}%</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((statistic, index) => (
          <PortfolioStatistic 
            key={index} 
            statistic={statistic.statistic} 
            statisticTitle={statistic.statisticTitle} 
            tip={statistic.tip} 
          />
        ))}
      </div>
      <div className="space-y-5">
        <h2 className="text-3xl md:text-4xl">Daily Valuations</h2>
        <PortfolioGraph tradingDates={portfolio.tradingDates} dailyValues={portfolio.dailyValues} cumulativeReturns={portfolio.cumulativeReturn}></PortfolioGraph>
      </div>
      <div className="space-y-5">
        <h2 className="text-3xl md:text-4xl">Daily Returns</h2>
        <PortfolioGraph tradingDates={portfolio.tradingDates} dailyValues={portfolio.dailyReturns} cumulativeReturns={portfolio.cumulativeReturn}></PortfolioGraph>
      </div>
    </section>
  );
}
