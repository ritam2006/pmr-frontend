import { BsFillQuestionCircleFill } from "react-icons/bs";

type Props = {
  statisticTitle: string;
  statistic: string;
  tip: string;
};

export default function PortfolioStatistic({ statisticTitle, statistic, tip }: Props) {
  return (
    <div className="h-36 text-center flex flex-col p-2 bg-background-2 rounded-xl shadow-md">
      <div className="text-base md:text-lg flex items-center justify-center gap-2">
        <p>{statisticTitle}</p>
        <div className="relative group">
          <BsFillQuestionCircleFill className="cursor-pointer" />
          <div className="absolute bottom-full w-24 lg:w-48 mb-2 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
            {tip}
          </div>
        </div>
      </div>
      <div className="flex-1 grid">
        <h3 className="text-lg md:text-2xl place-self-center">{statistic}</h3>
      </div>
    </div>
  );
}