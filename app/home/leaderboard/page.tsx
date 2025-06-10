"use client";

import { useEffect, useState } from "react";
import LeaderboardEntry from "@/app/components/LeaderboardEntry";
import { getTokenFromCookie } from "@/app/utils/getToken";
import LoadingIcon from "@/app/components/LoadingIcon";

type LeaderboardPortfolio = {
  id: number;
  username: string;
  name: string;
  sharpe: number;
  startDate: Date;
  endDate: Date;
};

export default function LeaderboardPage() {
  const [leaderboardPortfolios, setLeaderboardPortfolios] = useState<LeaderboardPortfolio[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
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

        const data = await res.json();
        setLeaderboardPortfolios(data);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <main className="space-y-6">
      <h1 className="text-4xl md:text-5xl">Leaderboard</h1>
      <p className="text-base md:text-lg">
        Here you can find all the top portfolios. Portfolios are ranked by Sharpe Coefficient. Compete for a spot at the top!
      </p>
      {loading ?
        <LoadingIcon className="w-32 h-32 mt-8 border-4 border-accent mx-auto" />
        :
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
            {leaderboardPortfolios.map((portfolio, index) => (
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
            ))}
          </tbody>
        </table>
      }
    </main>
  );
}