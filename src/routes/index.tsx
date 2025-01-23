import React, { useState } from 'react';
import Categories from './Categories'; // Assuming Categories is also converted to a React component

interface Player {
  id: number;
  name: string;
  score: number;
}

const Game: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Мадина", score: 0 },
    { id: 2, name: "Баян", score: 0 },
    { id: 3, name: "Марат", score: 0 },
    { id: 4, name: "Алина", score: 0 },
    { id: 5, name: "Айсулу", score: 0 },
  ]);

  const onAnswer = (playerId: number, price: number) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId ? { ...player, score: player.score + price } : player
      )
    );
  };

  return (
    <section>
      <h1 className="text-center">Своя Игра - Русский язык и литература</h1>
      <div>
        <h2 className='text-center'>Игроки</h2>
        <ul className="flex justify-center mt-4">
          {players.map(player => (
            <li key={player.name} className="p-2 bg-green-400 text-black flex flex-col gap-2 rounded-sm">
              <div>{player.name}</div>
              <div className="text-[14px] opacity-70">{player.score} очков</div>
            </li>
          ))}
        </ul>

        <Categories players={players} onAnswer={onAnswer} />
      </div>
    </section>
  );
};

export default Game;