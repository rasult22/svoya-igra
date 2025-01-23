import React, { useState } from 'react';
import { round1 } from '../rounds';

interface Player {
  id: number;
  name: string;
}

interface Question {
  question: string;
  answer?: string;
  price: number;
  img?: string;
  isRedirect?: boolean;
  show: boolean;
}

interface Category {
  name: string;
  prices: Question[];
}

interface GameBoardProps {
  players: Player[];
  onAnswer: (id: number, price: number) => void;
}

const Categories: React.FC<GameBoardProps> = ({ players, onAnswer }) => {
  const [categories, setCategories] = useState<Category[]>(round1.categories);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCellClick = (categoryIndex: number, priceIndex: number) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].prices[priceIndex].show = true;
    setCategories(updatedCategories);
  };

  const handleClick = (question: Question) => {
    setCurrentQuestion(question);
  };

  const handleAnswer = (id: number, price: number) => {
    onAnswer(id, price);
    setShowAnswer(false);
    if (currentQuestion) {
      const updatedCategories = categories.map((category) => ({
        ...category,
        prices: category.prices.map((q) =>
          q === currentQuestion ? { ...q, show: false } : q
        ),
      }));
      setCategories(updatedCategories);
    }
    setCurrentQuestion(null);
  };

  return (
    <div className="min-h-screen p-8">
      {currentQuestion && (
        <div className="fixed flex flex-col items-center justify-center w-full z-[50] h-full top-0 left-0 bg-blue-800">
          <div className="text-yellow-400 text-[32px]">
            {currentQuestion.question}
          </div>
          <button
            onClick={() => setShowAnswer(true)}
            className="bg-white text-black p-2 rounded-[12px] mt-4"
          >
            Показать ответ
          </button>
          {showAnswer && (
            <div className="mt-4">{currentQuestion.answer}</div>
          )}
          {showAnswer && (
            <div className="mt-4">
              <div className="text-yellow-400">Засчитать ответ игроку:</div>
              <ul className="flex justify-center mt-4 gap-4">
                {players.map((player) => (
                  <button
                    key={player.id}
                    onClick={() => handleAnswer(player.id, currentQuestion.price)}
                    className="p-2 bg-green-400 text-black flex flex-col gap-2 rounded-sm"
                  >
                    <div>{player.name}</div>
                  </button>
                ))}
                <button
                  onClick={() => handleAnswer(0, 0)}
                  className="p-2 bg-red-500 text-black rounded"
                >
                  Никому
                </button>
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category, i) => (
            <div key={category.name} className="space-y-4">
              <div className="bg-blue-800 p-4 h-24 flex items-center justify-center rounded">
                <div className="text-yellow-400 font-bold text-[20px] text-center">
                  {category.name}
                </div>
              </div>
              {category.prices.map((price, j) => (
                <div
                  key={price.price}
                  onClick={() => price.show && handleClick(price)}
                  style={{ opacity: price.show ? 1 : 0 }}
                  className="bg-blue-950 p-4 h-24 flex items-center justify-center rounded cursor-pointer"
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