import SignOut from "@/app/components/Signout";
import { getTokenFromCookie, getUsername } from "@/app/utils/getToken";

export default async function Account() {
  let accountData: { numPortfolios: number, bestSharpe: number } = { numPortfolios: 0, bestSharpe: 0.00};
  const username = await getUsername();

  try {
    const token = await getTokenFromCookie();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/accountData`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    accountData = await res.json();
  } catch (error) {
    console.error("Failed to load account data:", error);
    return <div className="text-red-500">Failed to load account data</div>
  }

  return (
    <main className="space-y-6">
      <h1 className="text-4xl md:text-5xl">Account</h1>
      <div className="text-lg md:text-2xl space-y-2">
        <h2>👤 Username: <span className="font-normal">{username}</span></h2>
        <h2>📊 Number of Portfolios: <span className="font-normal">{accountData.numPortfolios}</span></h2>
        <h2>🏆 Best Sharpe Ratio: <span className="font-normal">{accountData.bestSharpe === 0.00 ? "-" : accountData.bestSharpe.toFixed(2)}</span></h2>
      </div>
      <SignOut />
    </main>
  );
}