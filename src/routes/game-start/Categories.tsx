import React, { useState } from 'react';
import { Category, Player, Question } from '.';
import Timer from './Timer';

interface GameBoardProps {
  players: Player[];
  categories: Category[];
  updateCategories: (categories: Category[]) => void;
  onAnswer: (id: number, price: number, type: 'add' | 'subtract') => void;
}

const Categories: React.FC<GameBoardProps> = ({ players, onAnswer, categories, updateCategories }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  const handleClick = (question: Question) => {
    setCurrentQuestion(question);
  };

  const handleAnswer = (id: number, price: number, type: 'add' | 'subtract', isRedirect?: boolean) => {
    if (isRedirect) {
      if (currentQuestion) {
        const updatedCategories = categories.map((category) => ({
          ...category,
          prices: category.prices.map((q) =>
            q === currentQuestion ? { ...q, show: false } : q
          ),
        }));
        updateCategories(updatedCategories)
        setCurrentQuestion(null);
        return
      }
    }
    onAnswer(id, price, type);
    setShowAnswer(false);
    if (currentQuestion) {
      const updatedCategories = categories.map((category) => ({
        ...category,
        prices: category.prices.map((q) =>
          q === currentQuestion ? { ...q, show: false } : q
        ),
      }));
      updateCategories(updatedCategories)
    }
    setCurrentQuestion(null);
  };

  return (
    <div className="min-h-screen overflow-auto p-8">
      {currentQuestion && (
        <div className="fixed flex flex-col items-center justify-center w-full z-[50] h-full top-0 left-0 bg-blue-800">
          <div className='min-w-[150px] min-h-[150px] shrink-0'>
            {showTimer && <Timer onTimeEnd={() => {
              //
            }}/>}
            {
              !showTimer && 
              <div className="p-6 opacity-0">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-6 text-white-500">
                    0
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="text-yellow-400 text-center px-4 max-w-[60%] leading-[140%] text-[32px]">
            {currentQuestion.question}
          </div>
          {
            currentQuestion && currentQuestion.img && <img  src={currentQuestion.img} alt="img" className="w-1/2 max-w-[35vw] mt-4 rounded-lg border-2 border-black shadow" />
          }
          {
            !showAnswer && currentQuestion && !currentQuestion.isRedirect && 
            <button
              onClick={() => {
                setShowAnswer(true)
                setShowTimer(false)
              }}
              className="bg-white text-black p-2 rounded-[12px] mt-4"
            >
              Показать ответ
            </button>
          }
          {
            currentQuestion.isRedirect && <button
            onClick={() => handleAnswer(0, currentQuestion.price, 'add', true)}
            className="bg-white text-black p-2 rounded-[12px] mt-4"
          >
            Закрыть
          </button>
          }
          {showAnswer && (
            <div className="mt-8 bg-green-500 p-4 rounded-md">{currentQuestion.answer}</div>
          )}
          {showAnswer && (
            <div className="mt-8 flex flex-col">
              <div>
                <div className="">Засчитать <span className='text-green-400'>верный</span> ответ игроку:</div>
                <ul className="flex justify-center mt-4 gap-4">
                  {players.map((player) => (
                    <button
                      key={player.id}
                      onClick={() => handleAnswer(player.id, currentQuestion.price, 'add')}
                      className="p-2 bg-green-400 text-black flex flex-col gap-2 rounded-sm"
                    >
                      <div>{player.name}</div>
                    </button>
                  ))}
                  <button
                    onClick={() => handleAnswer(0, 0, 'add')}
                    className="p-2 bg-white text-black rounded"
                  >
                    Никому
                  </button>
                </ul>
              </div>
              <div>
                <div className="mt-8">Засчитать <span className='text-red-400'>неверный</span> ответ игроку:</div>
                <ul className="flex mt-4 gap-4">
                  {players.map((player) => (
                    <button
                      key={player.id}
                      onClick={() => handleAnswer(player.id, currentQuestion.price, 'subtract')}
                      className="p-2 bg-red-500 text-white flex flex-col gap-2 rounded-sm"
                    >
                      <div>{player.name}</div>
                    </button>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category, i) => (
            <div key={category.name} className="space-y-4">
              <div className="bg-blue-800 shadow-lg p-4 h-24 flex items-center justify-center rounded">
                <div className="text-yellow-400 font-bold text-[20px] text-center">
                  {category.name}
                </div>
              </div>
              {category.prices.map((price, j) => (
                <div
                  key={price.price}
                  onClick={() => price.show && handleClick(price)}
                  style={{ opacity: price.show ? 1 : 0 }}
                  className="bg-blue-950 shadow-lg p-4 h-24 flex items-center justify-center rounded cursor-pointer"
                >
                  <span className="text-yellow-400 font-bold text-2xl">
                    {price.price}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;