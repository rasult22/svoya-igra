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
    GameEnd
  </>
}

export default GameEnd;