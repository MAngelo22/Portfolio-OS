import { useState } from 'react';
import { Gamepad2, Sparkles, RefreshCcw } from 'lucide-react';

// Simple Snake Game
const SnakeGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
  };

  const simulateGameOver = () => {
    setGameOver(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {!gameStarted ? (
        <div className="text-center">
          <Gamepad2 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-4">Snake Game</h3>
          <p className="text-gray-600 mb-6">Use arrow keys to control the snake. Eat food to grow longer!</p>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Game Over!</h3>
          <p className="text-gray-600 mb-4">Your score: {score}</p>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            onClick={startGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="relative mb-4 border-4 border-gray-300 bg-gray-100 w-[300px] h-[300px]">
            <div className="absolute top-2 left-2 bg-blue-500 w-4 h-4"></div>
            <div className="absolute top-2 left-[26px] bg-blue-500 w-4 h-4"></div>
            <div className="absolute top-2 left-[50px] bg-blue-500 w-4 h-4"></div>
            <div className="absolute top-2 left-[74px] bg-blue-600 w-4 h-4 rounded-sm"></div>
            <div className="absolute top-[100px] left-[150px] bg-red-500 w-4 h-4 rounded-full"></div>
          </div>
          <div className="flex justify-between items-center w-[300px] mb-4">
            <span className="text-gray-700 font-medium">Score: {score}</span>
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              onClick={simulateGameOver}
            >
              <RefreshCcw className="w-4 h-4 text-gray-700" />
            </button>
          </div>
          <p className="text-gray-500 text-sm">This is a simulated game interface.</p>
        </div>
      )}
    </div>
  );
};

// Memory Card Game
const MemoryGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  
  const startGame = () => {
    setGameStarted(true);
  };
  
  const resetGame = () => {
    setGameStarted(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {!gameStarted ? (
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-4">Memory Card Game</h3>
          <p className="text-gray-600 mb-6">Flip cards and find matching pairs. Train your memory!</p>
          <button
            className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {Array(16).fill(null).map((_, i) => (
              <div 
                key={i}
                className="w-16 h-16 bg-purple-100 rounded-md flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors"
              >
                {i === 2 || i === 10 ? '🌟' : ''}
                {i === 3 || i === 7 ? '🚀' : ''}
                {i === 6 || i === 14 ? '🌈' : ''}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center w-full mb-4">
            <span className="text-gray-700 font-medium">Pairs Found: 3/8</span>
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              onClick={resetGame}
            >
              <RefreshCcw className="w-4 h-4 text-gray-700" />
            </button>
          </div>
          <p className="text-gray-500 text-sm">This is a simulated game interface.</p>
        </div>
      )}
    </div>
  );
};

const Games = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  const games = [
    {
      id: 'snake',
      name: 'Snake Game',
      icon: 'Gamepad2',
      description: 'Classic Snake Game. Control the snake to eat food and grow longer!',
      component: <SnakeGame />
    },
    {
      id: 'memory',
      name: 'Memory Cards',
      icon: 'Sparkles',
      description: 'Test your memory by finding matching pairs of cards.',
      component: <MemoryGame />
    }
  ];
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-500 text-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold flex items-center">
          <Gamepad2 className="mr-2 w-6 h-6" />
          Games
        </h2>
      </div>
      
      <div className="p-4 flex-grow overflow-y-auto">
        {activeGame ? (
          <div className="h-full">
            <div className="mb-4">
              <button
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                onClick={() => setActiveGame(null)}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Games
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-[calc(100%-40px)]">
              {games.find(game => game.id === activeGame)?.component}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-6">
              Take a break and enjoy some games! These are interactive mini-games showcasing my frontend development skills.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {games.map(game => (
                <div
                  key={game.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveGame(game.id)}
                >
                  <div className="flex items-center mb-2">
                    {game.icon === 'Gamepad2' && <Gamepad2 className="w-6 h-6 text-blue-500 mr-2" />}
                    {game.icon === 'Sparkles' && <Sparkles className="w-6 h-6 text-purple-500 mr-2" />}
                    <h3 className="text-lg font-bold text-gray-800">{game.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{game.description}</p>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors text-sm"
                  >
                    Play Now
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mt-6">
              <h4 className="font-semibold text-yellow-800 mb-2">Coming Soon</h4>
              <p className="text-gray-700">
                More games are under development! Check back soon for:
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">Tic Tac Toe</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">2048</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">Minesweeper</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;