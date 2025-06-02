import PortfolioForm from "@/app/components/PortfolioForm";
import { getTokenFromCookie } from "@/app/utils/getToken";

export default async function Portfolio() {
  let tickers: string[] = [];

  try {
    const token = await getTokenFromCookie();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/tickers`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    tickers = await res.json();
  } catch (error) {
    console.error("Failed to fetch tickers:", error);
    return <div className="text-red-500">Failed to load tickers</div>
  }

  return (
    <main className="mx-auto mt-12 mb-48 sm:w-fit">
      <PortfolioForm tickers={tickers} />
    </main>
  );
}