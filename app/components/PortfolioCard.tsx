type PortfolioProps = {
  id: number,
  name: string,
  assets: any,
  start: Date,
  end: Date,
  sharpe: number,
  valueAtRisk: number
};

export default function PortfolioCard({ id, name, assets, start, end, sharpe, valueAtRisk } : PortfolioProps) {
  return (
      <a href={`/home/portfolio/${id}`} className="flex bg-background-2 hover:bg-accent ease-in-out 
        duration-200 border-2 rounded-lg border-accent p-4 h-48 overflow-y-scroll">
        <div className="w-1/2 pr-3">
          <h2 className="text-xl truncate">{ name }</h2>
          <p className="text-sm">
            {`${start.getMonth() + 1}/${start.getDate()}/${start.getFullYear()}`}
            &nbsp;-&nbsp;
            {`${end.getMonth() + 1}/${end.getDate()}/${end.getFullYear()}`}
          </p>
          <div className="mt-2">
            <h3 className="mb-0.5">Asset Distribution</h3>
            {assets.map((asset: { ticker: string, weight: number }, index: number) => (
              <div className="flex gap-2 text-sm" key={index}>
                <h3>{asset.ticker}: </h3>
                <p>{asset.weight * 100}%</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <h2 className="text-lg">Metrics</h2>
          <h3 className="text-sm">Sharpe: {sharpe.toFixed(2)}</h3>
          <h3 className="text-sm">Value at Risk: ${(valueAtRisk * -1).toFixed(2)}</h3>
        </div>
      </a>
  );
}