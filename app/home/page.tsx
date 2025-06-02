import { MdAdd } from "react-icons/md";
import PortfolioCard from "../components/PortfolioCard";
import { getTokenFromCookie } from "../utils/getToken";

export default async function Home() {
  let userPortfolios = [];

  try {
    const token = await getTokenFromCookie();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/userPortfolios`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    userPortfolios = await res.json();
  } catch (error) {
    console.error("Failed to load user portfolios:", error);
    return <div className="text-red-500">Failed to load user portfolios</div>
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {userPortfolios.map(
            (
              portfolio: {
                id: number;
                name: string;
                assets: { ticker: string; weight: number };
                start: Date;
                end: Date;
                sharpe: number;
                valueAtRisk: number;
              },
              index: number
            ) => (
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
            )
          )}
        </div>
      </div>
    </main>
  );
}