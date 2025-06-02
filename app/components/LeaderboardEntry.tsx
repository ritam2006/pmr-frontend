type LeaderboardEntryProps = {
  index: number
  id: number,
  username: string,
  name: string,
  sharpe: number,
  startDate: Date,
  endDate: Date
};

export default function LeaderboardEntry({ index, id, username, name, sharpe, startDate, endDate } : LeaderboardEntryProps) {  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return (
    <tr 
      key={index}
    >
      <td className="border-2 border-accent px-2 py-1">{index + 1}</td>
      <td className="border-2 border-accent px-2 py-1">
        <p>{username}</p>
      </td>
      <td className="border-2 border-accent px-2 py-1">
        <a 
          href={`/home/portfolio/${id}`}
          className="hover:underline text-blue-500"
        >
          <span className="">{name}</span>
        </a>
      </td>
      <td className="border-2 border-accent px-2 py-1">{sharpe.toFixed(2)}</td>
      <td className="border-2 border-accent px-2 py-1 hidden lg:table-cell">{`${start.getMonth() + 1}/${start.getDate()}/${start.getFullYear()}`}</td>
      <td className="border-2 border-accent px-2 py-1 hidden lg:table-cell">{`${end.getMonth() + 1}/${end.getDate()}/${end.getFullYear()}`}</td>
    </tr>
  );
}