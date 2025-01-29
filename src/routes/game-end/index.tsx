import { Player } from "..";

const GameEnd = () => {
  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get('data');
  const parsedData: {
    players: Player[],
    winner: Player
  } | null = data ? JSON.parse(data) : null

  console.log(parsedData)
  return <>
    <h1 className="text-center text-[50px]">Результаты</h1>
    <li className="mt-8 w-[400px] mx-auto text-[24px] relative border border-green-400 p-2 text-center rounded-md bg-black text-black flex flex-col gap-2">
      <div className="text-white">Победитель!</div>
      <div className='p-4 text-center font-medium rounded-sm bg-green-400'>{parsedData?.winner.name}</div>
      <div className="text-[16px] text-white opacity-85">{parsedData?.winner.score} очков</div>
    </li>
    <div className="text-center mt-8">
      Таблица результатов
    </div>
    <div className="flex justify-center text-left mt-8">
      <div className="w-[50%]">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-3 border">Игрок</th>
              <th className="p-3 border">Счет</th>
            </tr>
          </thead>
          <tbody>
            {parsedData?.players.map((player, index) => (
              <tr key={index}>
                <td className="p-3 border">{player.name}</td>
                <td className="p-3 border">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
}

export default GameEnd;