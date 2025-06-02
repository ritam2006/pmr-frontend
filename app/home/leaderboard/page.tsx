import LeaderboardEntry from "@/app/components/LeaderboardEntry";
import { getTokenFromCookie } from "@/app/utils/getToken";

export default async function LeaderboardPage() {
  let leaderboardPortfolios = [];

  try {
    const token = await getTokenFromCookie();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/leaderboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    leaderboardPortfolios = await res.json();
  } catch (error) {
    console.error("Failed to load leaderboard:", error);
    return <div className="text-red-500">Failed to load leaderboard</div>
  }

  return (
    <main className="space-y-6">
      <h1 className="text-4xl md:text-5xl">Leaderboard</h1>
      <p className="text-base md:text-lg">
        Here you can find all the top portfolios. Portfolios are ranked by Sharpe Coefficient. Compete for a spot at the top!
      </p>

      <table className="w-full text-left border-2 border-accent">
        <thead className="text-sm sm:text-base md:text-lg lg:text-xl">
          <tr className="bg-background-2">
            <th className="border-2 border-accent p-2">Rank</th>
            <th className="border-2 border-accent p-2">User</th>
            <th className="border-2 border-accent p-2">Portfolio name</th>
            <th className="border-2 border-accent p-2">Sharpe</th>
            <th className="border-2 border-accent p-2 hidden lg:table-cell">Start Date</th>
            <th className="border-2 border-accent p-2 hidden lg:table-cell">End Date</th>
          </tr>
        </thead>
        <tbody className="text-xs sm:text-sm md:text-base lg:text-lg">
          {leaderboardPortfolios.map(
            (
              portfolio: {
                id: number;
                username: string;
                name: string;
                sharpe: number;
                startDate: Date;
                endDate: Date;
              },
              index: number
            ) => (
              <LeaderboardEntry
                key={index}
                index={index}
                id={portfolio.id}
                username={portfolio.username}
                name={portfolio.name}
                sharpe={portfolio.sharpe}
                startDate={portfolio.startDate}
                endDate={portfolio.endDate}
              />
            )
          )}
        </tbody>
      </table>
    </main>
  );
}
