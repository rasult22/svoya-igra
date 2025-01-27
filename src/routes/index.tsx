import React, { useEffect, useState } from 'react';
import Categories from './Categories'; // Assuming Categories is also converted to a React component
import { round1, round2, round3 } from '../rounds';
import { useNavigate } from 'react-router-dom';

const Game: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(round1.categories);
  const [currentRound, setCurrentRound] = useState(1);
  const navigate = useNavigate()
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Мадина", score: 0 },
    { id: 2, name: "Баян", score: 0 },
    { id: 3, name: "Амир", score: 0 },
    { id: 4, name: "Алина", score: 0 },
    { id: 5, name: "Айсулу", score: 0 },
  ]);

  const onAnswer = (playerId: number, price: number, type: 'add' | 'subtract') => {
    if (type === 'subtract') {
      setPlayers(prevPlayers =>
        prevPlayers.map(player =>
          player.id === playerId ? { ...player, score: player.score - 100 } : player
        )
      );
    } else {
      setPlayers(prevPlayers =>
        prevPlayers.map(player =>
          player.id === playerId ? { ...player, score: player.score + price } : player
        )
      );
    }
  };

  useEffect(() => {
    const excludePlayer = () => {
      const playerToExclude = players.find(player => player.score === Math.min(...players.map(p => p.score)));
      if (playerToExclude) {
        setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== playerToExclude.id));
      }
    }
    if (categories.every(category => category.prices.every(q => !q.show))) {
      if (currentRound === 1) {
        setCategories(round2.categories);
        setCurrentRound(2);
        excludePlayer();
      }
      if (currentRound === 2) {
        setCategories(round3.categories);
        setCurrentRound(3);
        excludePlayer();
      }
      if (currentRound === 3) {
        // End game
        // sum up scores
        // display winner 
        const winner = players.reduce((prev, current) => (prev.score > current.score) ? prev : current);
        const data = {
          winner,
          players
        }

        // encode URL data as query param
        const url = encodeURIComponent(JSON.stringify(data))
        

        navigate('/game-end'+ '?data=' + url) 
      }
    }
  }, [categories]);
  return (
    <section>
      <h1 className="text-center">Своя Игра - Русский язык и литература</h1>
      <h2 className="text-center"> {currentRound} раунд</h2>
      <div>
        <ul className="flex justify-center mt-4">
          {players.map(player => (
            <li key={player.name} className="text-[24px] border border-green-400 p-2 text-center rounded-md bg-black text-black flex flex-col gap-2">
              <div className='p-4 text-center font-medium rounded-sm bg-green-400'>{player.name}</div>
              <div className="text-[16px] text-white opacity-85">{player.score} очков</div>
            </li>
          ))}
        </ul>

        <Categories
          updateCategories={(categories) => {
            setCategories(categories)
          }} 
          players={players} 
          onAnswer={onAnswer} 
          categories={categories} />
      </div>
    </section>
  );
};

export default Game;


// NOTES

// 1. Первый раунд. У всех игроков по 0 очков. 3 категории по 5 вопросов.
// 2. Игрок выбирает категорию и вопрос. Вопрос открывается.
// 3. Идет таймер, когда кто-то из игроков отвечает, управляющий нажмает кнопку показать ответ.
// 4. Если ответ верный, засчитывает очки. Если нет, отнимает 100 очков.
// 5. Когда все вопросы в раунде закончатся, идет суммирование результатов и один игрок выбывает.
// 6. Начинается следующий раунд, один из игроков выбывает.


export interface Player {
  id: number;
  name: string;
  score: number;
}

export interface Question {
  question: string;
  answer?: string;
  price: number;
  img?: string;
  isRedirect?: boolean;
  show: boolean;
}

export interface Category {
  name: string;
  prices: Question[];
}