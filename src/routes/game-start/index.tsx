import React, { useEffect, useState } from 'react';
import Categories from './Categories';
import { round1, round2, round3 } from '../../rounds';
import { useNavigate } from 'react-router-dom';
// export const playerList = [
//   { id: 1, name: "Айгерим", score: 0, isExcludable: false, isWinnable: false, hidden: false },
//   { id: 2, name: "Елдана", score: 0, isExcludable: false, isWinnable: false, hidden: false },
//   { id: 3, name: "Баян", score: 0, isExcludable: false, isWinnable: false, hidden: false },
//   { id: 4, name: "Балауса", score: 0, isExcludable: false, isWinnable: false, hidden: false },
//   { id: 5, name: "Аида", score: 0, isExcludable: false, isWinnable: false, hidden: false },
// ]
export const playerList = [
  { id: 1, name: "Игрок 1", score: 0, isExcludable: false, isWinnable: false, hidden: false },
  { id: 2, name: "Игрок 2", score: 0, isExcludable: false, isWinnable: false, hidden: false },
  { id: 3, name: "Игрок 3", score: 0, isExcludable: false, isWinnable: false, hidden: false },
  { id: 4, name: "Игрок 4", score: 0, isExcludable: false, isWinnable: false, hidden: false },
  { id: 5, name: "Игрок 5", score: 0, isExcludable: false, isWinnable: false, hidden: false },
]

const Game: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(round1.categories);
  const [currentRound, setCurrentRound] = useState(1);
  const navigate = useNavigate()
  const [players, setPlayers] = useState<Player[]>(playerList);

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
  const deletePlayer = (playerId: number) => {
    setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== playerId));
    setPlayers(prevPlayers => prevPlayers.map(player => {
      return { ...player, isExcludable: false };
    }))
  }

  useEffect(() => {
    const excludePlayer = () => {
      const minScore = Math.min(...players.map(p => p.score));
      const playersWithMinScore = players.filter(player => player.score === minScore);
      if (playersWithMinScore.length === 1) {
        setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== playersWithMinScore[0].id));
      } else {
        // if there are multiple players with the same score set  isExcludable to true
        setPlayers(prevPlayers => prevPlayers.map(player => {
          if (player.score === minScore) {
            return { ...player, isExcludable: true };
          }
          return player;
        }));
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
        const maxScore = Math.max(...players.map(p => p.score));
        const playersWithMaxScore = players.filter(player => player.score === maxScore);
        if (playersWithMaxScore.length === 1) {
          const winner = players.reduce((prev, current) => (prev.score > current.score) ? prev : current);
          const data = {
            winner,
            players
          }
  
          // encode URL data as query param
          const url = encodeURIComponent(JSON.stringify(data))
          
  
          navigate('/game-end'+ '?data=' + url) 
        } else {
          // if there are multiple players with the same score set  isWinnable to true
          setPlayers(prevPlayers => prevPlayers.map(player => {
            if (player.score === maxScore) {
              return { ...player, isWinnable: true };
            }
            return player;
          }));
        }

      }
    }
  }, [categories]);
  return (
    <section>
      <h2 className="text-center"> {currentRound} раунд</h2>
      <div>
        <ul className="flex justify-center mt-4 pb-4">
          {players.map(player => (
            <li key={player.name} className="text-[24px] relative border border-green-400 p-2 text-center rounded-md bg-black text-black flex flex-col gap-2">
              <div className='p-4 text-center font-medium rounded-sm bg-green-400'>{player.name}</div>
              <div className="text-[16px] text-white opacity-85">{player.score} очков</div>
              {
                player.isExcludable &&
                <button onClick={() => {
                  deletePlayer(player.id)
                }} className='bg-white active:scale-95 transition-all hover:opacity-65 text-[12px] p-2 absolute bottom-[-39%] left-[50%] translate-x-[-50%]'>Исключить</button>
              }
              {
                player.isWinnable &&
                <button onClick={() => {
                  const data = {
                    winner: player,
                    players
                  }
                  // encode URL data as query param
                  const url = encodeURIComponent(JSON.stringify(data))
                  navigate('/game-end'+ '?data=' + url) 
                }} className='bg-white active:scale-95 transition-all hover:opacity-65 text-[12px] p-2 absolute bottom-[-39%] left-[50%] translate-x-[-50%]'>Присвоить победу</button>
              }
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
  isExcludable: boolean;
  isWinnable: boolean;
  hidden: boolean;
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