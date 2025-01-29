import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import intro_sound from './game-start/intro.mp3'
import { playerList } from './game-start';

const Game: React.FC = () => {
  const navigate = useNavigate()
  const introSoundRef = useRef<HTMLAudioElement>(null)
  
  const [players, setPlayers] = useState<Player[]>(playerList);

  useEffect(() => {
    if (introSoundRef.current) {
      introSoundRef.current.volume = 0.4
      introSoundRef.current.play();
    } else {
      setTimeout(() => {
        if (introSoundRef.current) {
          introSoundRef.current.volume = 0.4
          introSoundRef.current.play();
        }
      }, 1000)
    }
  }, [])

  return (
    <section className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className="text-center max-w-[500px]">Добро пожаловать в интеллектуальную игру <br/> "Своя игра".</h1>
      <h2 className="text-center text-blue-100">Русский язык и литература</h2>
      <div>
        <ul className="flex justify-center mt-4 pb-4">
          {players.map(player => (
            <li key={player.name} className="text-[24px] relative border border-green-400 p-2 text-center rounded-md bg-black text-black flex flex-col gap-2">
              <div className='p-4 text-center font-medium rounded-sm bg-green-400'>{player.name}</div>
              <div className="text-[16px] text-white opacity-85">{player.score} очков</div>
              {
                player.isExcludable &&
                <button onClick={() => {
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
      </div>
      <audio autoPlay className="w-0 h-0" ref={introSoundRef} src={intro_sound} preload="auto"></audio>

      <button onClick={() => {
        navigate('/game-start')
      }} className='active:scale-95 transition-all active:opacity-85 bg-gradient-to-r mt-9 from-green-500 to-blue-400 p-4 text-white font-medium rounded-md'>Начать игру</button>
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