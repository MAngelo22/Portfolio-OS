import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Gamepad2, Sparkles, RefreshCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Spade, Club, Diamond, Heart, Layers } from 'lucide-react';

type Direction = 'up' | 'down' | 'left' | 'right';

const GRID_SIZE = 15;
const CELL_SIZE = 18;
const TICK_MS = 130;

const DIRECTION_STEPS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE_DIRECTION: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

interface Point {
  x: number;
  y: number;
}

const randomFood = (snake: Point[]): Point => {
  const occupied = new Set(snake.map((part) => `${part.x}-${part.y}`));

  let food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };

  while (occupied.has(`${food.x}-${food.y}`)) {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }

  return food;
};

const initialSnake = (): Point[] => [
  { x: 7, y: 7 },
  { x: 6, y: 7 },
  { x: 5, y: 7 },
];

const DirectionPad = ({
  onMove,
  disabled,
}: {
  onMove: (direction: Direction) => void;
  disabled?: boolean;
}) => (
  <div className="w-32 select-none">
    <div className="flex justify-center">
      <button
        type="button"
        className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
        onClick={() => onMove('up')}
        disabled={disabled}
        aria-label="Move up"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
    <div className="flex justify-between mt-2">
      <button
        type="button"
        className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
        onClick={() => onMove('left')}
        disabled={disabled}
        aria-label="Move left"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
        onClick={() => onMove('down')}
        disabled={disabled}
        aria-label="Move down"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
        onClick={() => onMove('right')}
        disabled={disabled}
        aria-label="Move right"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const SnakeGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState<Point[]>(initialSnake);
  const [food, setFood] = useState<Point>(() => randomFood(initialSnake()));
  const [direction, setDirection] = useState<Direction>('right');
  const [queuedDirection, setQueuedDirection] = useState<Direction>('right');

  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver) {
      return;
    }

    setSnake((currentSnake) => {
      const effectiveDirection = queuedDirection;
      const head = currentSnake[0];
      const step = DIRECTION_STEPS[effectiveDirection];
      const nextHead = { x: head.x + step.x, y: head.y + step.y };

      const wallCollision =
        nextHead.x < 0 ||
        nextHead.y < 0 ||
        nextHead.x >= GRID_SIZE ||
        nextHead.y >= GRID_SIZE;

      if (wallCollision) {
        setGameOver(true);
        return currentSnake;
      }

      const willEat = nextHead.x === food.x && nextHead.y === food.y;
      const nextSnake = [nextHead, ...currentSnake];

      if (!willEat) {
        nextSnake.pop();
      }

      const selfCollision = nextSnake
        .slice(1)
        .some((part) => part.x === nextHead.x && part.y === nextHead.y);

      if (selfCollision) {
        setGameOver(true);
        return currentSnake;
      }

      if (willEat) {
        setScore((prev) => prev + 1);
        setFood(randomFood(nextSnake));
      }

      setDirection(effectiveDirection);
      return nextSnake;
    });
  }, [food, gameOver, gameStarted, queuedDirection]);

  useEffect(() => {
    if (!gameStarted || gameOver) {
      return;
    }

    const timer = window.setInterval(moveSnake, TICK_MS);
    return () => window.clearInterval(timer);
  }, [gameOver, gameStarted, moveSnake]);

  const queueDirection = useCallback(
    (nextDirection: Direction) => {
      if (OPPOSITE_DIRECTION[direction] === nextDirection) {
        return;
      }
      setQueuedDirection(nextDirection);
    },
    [direction]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameStarted || gameOver) {
        return;
      }

      if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') {
        event.preventDefault();
        queueDirection('up');
      }
      if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') {
        event.preventDefault();
        queueDirection('down');
      }
      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        event.preventDefault();
        queueDirection('left');
      }
      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
        event.preventDefault();
        queueDirection('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, gameStarted, queueDirection]);

  const startGame = () => {
    const snakeSeed = initialSnake();
    setSnake(snakeSeed);
    setFood(randomFood(snakeSeed));
    setDirection('right');
    setQueuedDirection('right');
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {!gameStarted ? (
        <div className="text-center">
          <Gamepad2 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-4">Snake</h3>
          <p className="text-gray-600 mb-6">Usa la cruceta (flechas o botones) para moverte y comer frutas.</p>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            onClick={startGame}
          >
            Empezar
          </button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Perdiste</h3>
          <p className="text-gray-600 mb-4">Puntaje: {score}</p>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            onClick={startGame}
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div
            className="relative border-4 border-gray-300 bg-gray-100"
            style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
          >
            {snake.map((part, index) => (
              <div
                key={`${part.x}-${part.y}-${index}`}
                className={`absolute ${index === 0 ? 'bg-blue-700' : 'bg-blue-500'} rounded-[2px]`}
                style={{
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  left: part.x * CELL_SIZE + 1,
                  top: part.y * CELL_SIZE + 1,
                }}
              />
            ))}
            <div
              className="absolute bg-red-500 rounded-full"
              style={{
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
                left: food.x * CELL_SIZE + 1,
                top: food.y * CELL_SIZE + 1,
              }}
            />
          </div>

          <div className="flex items-center justify-between w-full max-w-[300px]">
            <span className="text-gray-700 font-medium">Puntaje: {score}</span>
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              onClick={startGame}
              title="Restart"
            >
              <RefreshCcw className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          <DirectionPad onMove={queueDirection} />
        </div>
      )}
    </div>
  );
};

const MEMORY_ICONS = ['JS', 'TS', 'UI', 'DB', 'API', 'UX', 'SEO', 'WEB'];

interface MemoryCard {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const createMemoryCards = (): MemoryCard[] => {
  const duplicated = [...MEMORY_ICONS, ...MEMORY_ICONS]
    .map((icon, index) => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);

  return duplicated;
};

const MemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>(() => createMemoryCards());
  const [firstFlipped, setFirstFlipped] = useState<number | null>(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [moves, setMoves] = useState(0);

  const matchedPairs = cards.filter((card) => card.isMatched).length / 2;
  const gameWon = matchedPairs === MEMORY_ICONS.length;

  const resetGame = () => {
    setCards(createMemoryCards());
    setFirstFlipped(null);
    setLockBoard(false);
    setMoves(0);
  };

  const flipCard = (id: number) => {
    if (lockBoard) {
      return;
    }

    const clicked = cards.find((card) => card.id === id);
    if (!clicked || clicked.isMatched || clicked.isFlipped) {
      return;
    }

    const nextCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(nextCards);

    if (firstFlipped === null) {
      setFirstFlipped(id);
      return;
    }

    setMoves((prev) => prev + 1);

    const firstCard = nextCards.find((card) => card.id === firstFlipped);
    const secondCard = nextCards.find((card) => card.id === id);

    if (!firstCard || !secondCard) {
      setFirstFlipped(null);
      return;
    }

    if (firstCard.icon === secondCard.icon) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === firstFlipped || card.id === id
            ? { ...card, isMatched: true }
            : card
        )
      );
      setFirstFlipped(null);
      return;
    }

    setLockBoard(true);
    window.setTimeout(() => {
      setCards((prev) =>
        prev.map((card) =>
          card.id === firstFlipped || card.id === id
            ? { ...card, isFlipped: false }
            : card
        )
      );
      setFirstFlipped(null);
      setLockBoard(false);
    }, 650);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center mb-3">
        <Sparkles className="w-10 h-10 text-purple-500 mx-auto mb-2" />
        <h3 className="text-lg font-bold text-gray-800">Memory</h3>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`w-14 h-14 rounded-md text-2xl flex items-center justify-center transition-colors ${
              card.isFlipped || card.isMatched
                ? 'bg-purple-100'
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
            onClick={() => flipCard(card.id)}
            disabled={card.isMatched}
          >
            {card.isFlipped || card.isMatched ? card.icon : ''}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center w-full max-w-[320px] mb-4">
        <span className="text-gray-700 font-medium">
          Pares: {matchedPairs}/{MEMORY_ICONS.length}
        </span>
        <span className="text-gray-700 font-medium">Movimientos: {moves}</span>
        <button
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          onClick={resetGame}
        >
          <RefreshCcw className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <p className="text-gray-600 text-sm text-center max-w-[360px]">
        {gameWon ? 'Completaste todos los pares.' : 'Encuentra todos los pares para ganar.'}
      </p>
    </div>
  );
};

type Suit = 'spades' | 'clubs' | 'diamonds' | 'hearts';

interface Card {
  id: string;
  suit: Suit;
  rank: number;
  faceUp: boolean;
}

interface DragPayload {
  source: 'waste' | 'tableau';
  pileIndex?: number;
  cardIndex?: number;
}

interface ActiveDrag {
  payload: DragPayload;
  cards: Card[];
  pointerId: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}

interface FallingCard {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotate: number;
  symbol: string;
  color: string;
}

const SUITS: Suit[] = ['spades', 'clubs', 'diamonds', 'hearts'];

const suitLabel = (suit: Suit) => {
  if (suit === 'spades') return '\u2660';
  if (suit === 'clubs') return '\u2663';
  if (suit === 'diamonds') return '\u2666';
  return '\u2665';
};

const rankLabel = (rank: number) => {
  if (rank === 1) return 'A';
  if (rank === 11) return 'J';
  if (rank === 12) return 'Q';
  if (rank === 13) return 'K';
  return String(rank);
};

const isRed = (suit: Suit) => suit === 'hearts' || suit === 'diamonds';

const shuffleDeck = (): Card[] => {
  const deck: Card[] = [];

  SUITS.forEach((suit) => {
    for (let rank = 1; rank <= 13; rank += 1) {
      deck.push({
        id: `${suit}-${rank}`,
        suit,
        rank,
        faceUp: false,
      });
    }
  });

  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};

const initializeSolitaire = () => {
  const deck = shuffleDeck();
  const tableau: Card[][] = [[], [], [], [], [], [], []];

  for (let pile = 0; pile < 7; pile += 1) {
    for (let count = 0; count <= pile; count += 1) {
      const card = deck.pop();
      if (!card) continue;
      tableau[pile].push({ ...card, faceUp: count === pile });
    }
  }

  return {
    stock: deck,
    waste: [] as Card[],
    tableau,
    foundations: {
      spades: [] as Card[],
      clubs: [] as Card[],
      diamonds: [] as Card[],
      hearts: [] as Card[],
    },
  };
};

const canMoveToTableau = (movingCard: Card, pile: Card[]) => {
  const top = pile[pile.length - 1];
  if (!top) {
    return movingCard.rank === 13;
  }
  if (!top.faceUp) {
    return false;
  }

  return isRed(top.suit) !== isRed(movingCard.suit) && top.rank === movingCard.rank + 1;
};

const canMoveToFoundation = (movingCard: Card, foundation: Card[]) => {
  const top = foundation[foundation.length - 1];
  if (!top) {
    return movingCard.rank === 1;
  }

  return top.suit === movingCard.suit && movingCard.rank === top.rank + 1;
};

const NUMBER_PIP_LAYOUT: Record<number, Array<'none' | 'single' | 'pair'>> = {
  1: ['none', 'none', 'single', 'none', 'none'],
  2: ['single', 'none', 'none', 'none', 'single'],
  3: ['single', 'none', 'single', 'none', 'single'],
  4: ['pair', 'none', 'none', 'none', 'pair'],
  5: ['pair', 'none', 'single', 'none', 'pair'],
  6: ['pair', 'none', 'pair', 'none', 'pair'],
  7: ['pair', 'single', 'pair', 'none', 'pair'],
  8: ['pair', 'single', 'pair', 'single', 'pair'],
  9: ['pair', 'pair', 'single', 'pair', 'pair'],
  10: ['pair', 'pair', 'pair', 'pair', 'pair'],
};

const CardFace = ({ card }: { card: Card }) => {
  const label = rankLabel(card.rank);
  const symbol = suitLabel(card.suit);
  const tone = isRed(card.suit) ? 'text-red-600' : 'text-gray-900';
  const pipLayout = card.rank <= 10 ? NUMBER_PIP_LAYOUT[card.rank] : null;

  return (
    <div className={`relative w-full h-full ${tone}`}>
      <div className="absolute top-1 left-1 flex flex-col items-center leading-none">
        <span className="text-[10px] sm:text-xs font-bold">{label}</span>
        <span className="text-[10px] sm:text-xs">{symbol}</span>
      </div>

      <div className="absolute right-1 bottom-1 rotate-180 flex flex-col items-center leading-none">
        <span className="text-[10px] sm:text-xs font-bold">{label}</span>
        <span className="text-[10px] sm:text-xs">{symbol}</span>
      </div>

      <div className="absolute inset-0 px-2 py-1 flex items-center justify-center">
        {pipLayout ? (
          <div className="w-full h-full pt-3 pb-3 flex flex-col justify-between">
            {pipLayout.map((row, index) => (
              <div key={`${card.id}-pip-${index}`} className="w-full flex items-center justify-center leading-tight">
                {row === 'single' && <span className="text-[13px] sm:text-sm">{symbol}</span>}
                {row === 'pair' && (
                  <div className="w-full flex items-center justify-between px-1">
                    <span className="text-[13px] sm:text-sm">{symbol}</span>
                    <span className="text-[13px] sm:text-sm">{symbol}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center leading-none">
            <span className="text-xl sm:text-2xl font-bold">{label}</span>
            <span className="text-lg sm:text-xl">{symbol}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const cardClass = (card: Card) =>
  `w-12 sm:w-16 h-16 sm:h-20 border rounded-md overflow-hidden ${
    card.faceUp ? 'bg-white' : 'bg-blue-700 text-blue-100'
  }`;

const SolitaireGame = () => {
  const [state, setState] = useState(initializeSolitaire);
  const [dragSource, setDragSource] = useState<DragPayload | null>(null);
  const [selectedPayload, setSelectedPayload] = useState<DragPayload | null>(null);
  const [activeDrag, setActiveDrag] = useState<ActiveDrag | null>(null);
  const [fallingCards, setFallingCards] = useState<FallingCard[]>([]);
  const tableauDropRefs = useRef<Array<HTMLDivElement | null>>([]);
  const foundationDropRefs = useRef<Record<Suit, HTMLButtonElement | null>>({
    spades: null,
    clubs: null,
    diamonds: null,
    hearts: null,
  });

  const wasteTop = state.waste[state.waste.length - 1];
  const foundationsDone = Object.values(state.foundations).every((pile) => pile.length === 13);

  useEffect(() => {
    if (!foundationsDone) {
      setFallingCards([]);
      return;
    }

    const symbols = ['\u2660', '\u2663', '\u2666', '\u2665'];
    const colors = ['#1f2937', '#0f766e', '#dc2626', '#7c3aed'];
    const burst = Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2.2,
      duration: 2.2 + Math.random() * 1.8,
      rotate: -80 + Math.random() * 160,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setFallingCards(burst);
  }, [foundationsDone]);

  const reset = () => {
    setState(initializeSolitaire());
    setDragSource(null);
    setSelectedPayload(null);
    setActiveDrag(null);
    setFallingCards([]);
  };

  const drawFromStock = () => {
    if (foundationsDone) {
      return;
    }
    setDragSource(null);
    setSelectedPayload(null);
    setActiveDrag(null);
    setState((prev) => {
      if (prev.stock.length === 0) {
        if (prev.waste.length === 0) {
          return prev;
        }

        return {
          ...prev,
          stock: [...prev.waste].reverse().map((card) => ({ ...card, faceUp: false })),
          waste: [],
        };
      }

      const nextStock = [...prev.stock];
      const card = nextStock.pop();
      if (!card) {
        return prev;
      }

      return {
        ...prev,
        stock: nextStock,
        waste: [...prev.waste, { ...card, faceUp: true }],
      };
    });
  };

  const isValidTableauSequence = (pile: Card[], startIndex: number) => {
    const sequence = pile.slice(startIndex);
    if (sequence.length === 0 || !sequence[0].faceUp) {
      return false;
    }
    for (let i = 1; i < sequence.length; i += 1) {
      const prev = sequence[i - 1];
      const current = sequence[i];
      if (!current.faceUp) {
        return false;
      }
      if (isRed(prev.suit) === isRed(current.suit)) {
        return false;
      }
      if (prev.rank !== current.rank + 1) {
        return false;
      }
    }
    return true;
  };

  const movePayloadToTableau = useCallback((payload: DragPayload, targetPileIndex: number) => {
    if (foundationsDone) {
      return false;
    }
    let moved = false;
    setState((prev) => {
      const targetPile = prev.tableau[targetPileIndex];

      if (payload.source === 'waste') {
        const card = prev.waste[prev.waste.length - 1];
        if (!card || !canMoveToTableau(card, targetPile)) {
          return prev;
        }
        moved = true;
        const nextTableau = prev.tableau.map((pile, index) =>
          index === targetPileIndex ? [...pile, card] : pile
        );
        return {
          ...prev,
          waste: prev.waste.slice(0, -1),
          tableau: nextTableau,
        };
      }

      const fromPileIndex = payload.pileIndex;
      const cardIndex = payload.cardIndex;
      if (fromPileIndex === undefined || cardIndex === undefined) {
        return prev;
      }
      if (fromPileIndex === targetPileIndex) {
        return prev;
      }

      const sourcePile = prev.tableau[fromPileIndex];
      if (!isValidTableauSequence(sourcePile, cardIndex)) {
        return prev;
      }
      const movingStack = sourcePile.slice(cardIndex);
      const movingCard = movingStack[0];
      if (!movingCard || !canMoveToTableau(movingCard, targetPile)) {
        return prev;
      }
      moved = true;

      const nextTableau = prev.tableau.map((pile, index) => {
        if (index === fromPileIndex) {
          const reduced = pile.slice(0, cardIndex);
          if (reduced.length > 0) {
            reduced[reduced.length - 1] = { ...reduced[reduced.length - 1], faceUp: true };
          }
          return reduced;
        }
        if (index === targetPileIndex) {
          return [...pile, ...movingStack];
        }
        return pile;
      });

      return { ...prev, tableau: nextTableau };
    });
    if (moved) {
      setDragSource(null);
      setSelectedPayload(null);
      setActiveDrag(null);
    }
    return moved;
  }, [foundationsDone]);

  const movePayloadToFoundation = useCallback((payload: DragPayload, suit: Suit) => {
    if (foundationsDone) {
      return false;
    }
    let moved = false;
    setState((prev) => {
      const foundationPile = prev.foundations[suit];

      if (payload.source === 'waste') {
        const card = prev.waste[prev.waste.length - 1];
        if (!card || card.suit !== suit || !canMoveToFoundation(card, foundationPile)) {
          return prev;
        }
        moved = true;
        return {
          ...prev,
          waste: prev.waste.slice(0, -1),
          foundations: {
            ...prev.foundations,
            [suit]: [...foundationPile, card],
          },
        };
      }

      const fromPileIndex = payload.pileIndex;
      const cardIndex = payload.cardIndex;
      if (fromPileIndex === undefined || cardIndex === undefined) {
        return prev;
      }

      const sourcePile = prev.tableau[fromPileIndex];
      const movingStack = sourcePile.slice(cardIndex);
      if (movingStack.length !== 1 || !movingStack[0].faceUp) {
        return prev;
      }

      const card = movingStack[0];
      if (card.suit !== suit || !canMoveToFoundation(card, foundationPile)) {
        return prev;
      }
      moved = true;

      const nextTableau = prev.tableau.map((pile, index) => {
        if (index !== fromPileIndex) {
          return pile;
        }
        const reduced = pile.slice(0, cardIndex);
        if (reduced.length > 0) {
          reduced[reduced.length - 1] = { ...reduced[reduced.length - 1], faceUp: true };
        }
        return reduced;
      });

      return {
        ...prev,
        tableau: nextTableau,
        foundations: {
          ...prev.foundations,
          [suit]: [...foundationPile, card],
        },
      };
    });
    if (moved) {
      setDragSource(null);
      setSelectedPayload(null);
      setActiveDrag(null);
    }
    return moved;
  }, [foundationsDone]);

  const autoMoveWasteToFoundation = () => {
    if (!wasteTop || foundationsDone) {
      return;
    }
    movePayloadToFoundation({ source: 'waste' }, wasteTop.suit);
  };

  const autoMoveTableauCardToFoundation = (pileIndex: number, cardIndex: number) => {
    if (foundationsDone) {
      return;
    }

    setState((prev) => {
      const pile = prev.tableau[pileIndex];
      if (cardIndex !== pile.length - 1) {
        return prev;
      }

      const card = pile[cardIndex];
      if (!card || !card.faceUp) {
        return prev;
      }

      const foundationPile = prev.foundations[card.suit];
      if (!canMoveToFoundation(card, foundationPile)) {
        return prev;
      }

      const reduced = pile.slice(0, -1);
      if (reduced.length > 0) {
        reduced[reduced.length - 1] = { ...reduced[reduced.length - 1], faceUp: true };
      }

      const nextTableau = prev.tableau.map((tableauPile, index) =>
        index === pileIndex ? reduced : tableauPile
      );

      return {
        ...prev,
        tableau: nextTableau,
        foundations: {
          ...prev.foundations,
          [card.suit]: [...foundationPile, card],
        },
      };
    });
  };

  const startPointerDrag = (
    event: React.PointerEvent<HTMLButtonElement>,
    payload: DragPayload,
    cards: Card[]
  ) => {
    if (foundationsDone || cards.length === 0) {
      return;
    }
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    event.preventDefault();
    setSelectedPayload(null);
    setDragSource(payload);
    setActiveDrag({
      payload,
      cards,
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!activeDrag) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activeDrag.pointerId) {
        return;
      }
      setActiveDrag((current) =>
        current
          ? {
              ...current,
              x: event.clientX,
              y: event.clientY,
            }
          : current
      );
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== activeDrag.pointerId) {
        return;
      }

      let moved = false;
      for (const suit of SUITS) {
        const foundationNode = foundationDropRefs.current[suit];
        if (!foundationNode) {
          continue;
        }
        const rect = foundationNode.getBoundingClientRect();
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          movePayloadToFoundation(activeDrag.payload, suit);
          moved = true;
          break;
        }
      }

      if (!moved) {
        for (let index = 0; index < tableauDropRefs.current.length; index += 1) {
          const tableauNode = tableauDropRefs.current[index];
          if (!tableauNode) {
            continue;
          }
          const rect = tableauNode.getBoundingClientRect();
          if (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
          ) {
            movePayloadToTableau(activeDrag.payload, index);
            moved = true;
            break;
          }
        }
      }

      if (!moved) {
        setDragSource(null);
        setActiveDrag(null);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerEnd);
    window.addEventListener('pointercancel', handlePointerEnd);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerEnd);
      window.removeEventListener('pointercancel', handlePointerEnd);
    };
  }, [activeDrag, movePayloadToFoundation, movePayloadToTableau]);

  return (
    <div className="h-full flex flex-col gap-4 relative overflow-hidden">
      {foundationsDone && fallingCards.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {fallingCards.map((card) => (
            <div
              key={card.id}
              className="solitaire-fall-card absolute top-[-60px] text-2xl font-bold"
              style={{
                left: `${card.left}%`,
                color: card.color,
                transform: `rotate(${card.rotate}deg)`,
                animationDelay: `${card.delay}s`,
                animationDuration: `${card.duration}s`,
              }}
            >
              {card.symbol}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Solitario</h3>
          <p className="text-sm text-gray-600">Arrastra cartas y suelta en columnas/fundaciones (reglas clasicas).</p>
        </div>
        <button
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          onClick={reset}
          title="Nuevo juego"
        >
          <RefreshCcw className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <div className="bg-green-700 rounded-lg p-2 sm:p-3 text-white">
        <div className="flex flex-wrap gap-2 sm:gap-3 items-start justify-between">
          <div className="flex gap-1.5 sm:gap-2">
            <button
              type="button"
              className="w-12 sm:w-16 h-16 sm:h-20 rounded border border-white/40 bg-green-900/40 hover:bg-green-900/60 text-[10px] sm:text-xs"
              onClick={drawFromStock}
              title="Robar carta"
            >
              {state.stock.length > 0 ? `Stock (${state.stock.length})` : 'Reciclar'}
            </button>

            <button
              type="button"
              className={`w-12 sm:w-16 h-16 sm:h-20 rounded border border-white/40 text-[10px] sm:text-xs touch-none select-none cursor-grab active:cursor-grabbing ${
                dragSource?.source === 'waste' || selectedPayload?.source === 'waste' ? 'ring-2 ring-yellow-300' : ''
              } ${wasteTop ? 'bg-white text-black p-0 overflow-hidden' : 'bg-green-900/40 text-white/70'} ${
                activeDrag?.payload.source === 'waste' ? 'opacity-0' : ''
              }`}
              onClick={() => {
                if (!wasteTop || foundationsDone || activeDrag) {
                  return;
                }
                setSelectedPayload((current) => (current?.source === 'waste' ? null : { source: 'waste' }));
              }}
              onDoubleClick={autoMoveWasteToFoundation}
              disabled={!wasteTop}
              onPointerDown={(event) => {
                if (!wasteTop) {
                  return;
                }
                startPointerDrag(event, { source: 'waste' }, [wasteTop]);
              }}
              title="Descarte (doble clic para mandar a fundación)"
            >
              {wasteTop ? <CardFace card={wasteTop} /> : 'Waste'}
            </button>
          </div>

          <div className="flex gap-1.5 sm:gap-2">
            {SUITS.map((suit) => {
              const top = state.foundations[suit][state.foundations[suit].length - 1];
              const Icon = suit === 'spades' ? Spade : suit === 'clubs' ? Club : suit === 'diamonds' ? Diamond : Heart;

              return (
                <button
                  key={suit}
                  ref={(node) => {
                    foundationDropRefs.current[suit] = node;
                  }}
                  type="button"
                  className={`w-12 sm:w-16 h-16 sm:h-20 rounded border border-white/40 hover:bg-green-900/60 flex flex-col items-center justify-center text-[10px] sm:text-xs ${
                    top ? 'bg-white p-0 overflow-hidden' : 'bg-green-900/40'
                  }`}
                  onClick={() => {
                    if (!selectedPayload || activeDrag) {
                      return;
                    }
                    movePayloadToFoundation(selectedPayload, suit);
                  }}
                  title="Mover carta seleccionada"
                >
                  {top ? (
                    <CardFace card={top} />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto touch-pan-x">
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 min-w-[420px] sm:min-w-[560px]">
          {state.tableau.map((pile, pileIndex) => (
            <div
              key={pileIndex}
              ref={(node) => {
                tableauDropRefs.current[pileIndex] = node;
              }}
              className="relative h-[300px] sm:h-[360px] bg-green-100 rounded-md p-1.5 sm:p-2"
              onClick={() => {
                if (!selectedPayload || activeDrag) {
                  return;
                }
                movePayloadToTableau(selectedPayload, pileIndex);
              }}
              title="Mover selección a esta columna"
            >
              {pile.length === 0 ? (
                <div className="w-12 sm:w-16 h-16 sm:h-20 border border-dashed border-green-400 rounded-md" />
              ) : (
                pile.map((card, cardIndex) => {
                  const isSequenceStart = card.faceUp && isValidTableauSequence(pile, cardIndex);
                  const movingFromThisPile =
                    activeDrag?.payload.source === 'tableau' &&
                    activeDrag.payload.pileIndex === pileIndex &&
                    activeDrag.payload.cardIndex !== undefined &&
                    cardIndex >= activeDrag.payload.cardIndex;

                  return (
                    <button
                      key={card.id}
                      type="button"
                      className={`${cardClass(card)} absolute left-1.5 sm:left-2 touch-none select-none cursor-grab active:cursor-grabbing ${
                        dragSource?.source === 'tableau' &&
                        dragSource.pileIndex === pileIndex &&
                        dragSource.cardIndex === cardIndex
                          ? 'ring-2 ring-yellow-400'
                          : ''
                      } ${
                        selectedPayload?.source === 'tableau' &&
                        selectedPayload.pileIndex === pileIndex &&
                        selectedPayload.cardIndex === cardIndex
                          ? 'ring-2 ring-blue-400'
                          : ''
                      } ${movingFromThisPile ? 'opacity-0' : ''} ${
                        card.faceUp ? '' : 'flex items-center justify-center'
                      }`}
                      style={{ top: `${cardIndex * 20}px`, zIndex: cardIndex + 1 }}
                      onClick={(event) => {
                        event.stopPropagation();
                        if (!isSequenceStart || foundationsDone || activeDrag) {
                          return;
                        }
                        setSelectedPayload((current) => {
                          if (
                            current?.source === 'tableau' &&
                            current.pileIndex === pileIndex &&
                            current.cardIndex === cardIndex
                          ) {
                            return null;
                          }
                          return { source: 'tableau', pileIndex, cardIndex };
                        });
                      }}
                      onDoubleClick={() => autoMoveTableauCardToFoundation(pileIndex, cardIndex)}
                      onPointerDown={(event) => {
                        event.stopPropagation();
                        if (!isSequenceStart) {
                          return;
                        }
                        startPointerDrag(
                          event,
                          { source: 'tableau', pileIndex, cardIndex },
                          pile.slice(cardIndex)
                        );
                      }}
                    >
                      {card.faceUp ? (
                        <CardFace card={card} />
                      ) : (
                        <Layers className="w-4 h-4" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          ))}
        </div>
      </div>

      {activeDrag && (
        <div
          className="fixed pointer-events-none z-30"
          style={{
            left: activeDrag.x - activeDrag.offsetX,
            top: activeDrag.y - activeDrag.offsetY,
          }}
        >
          {activeDrag.cards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className={`${cardClass(card)} absolute left-0 shadow-lg`}
              style={{ top: `${index * 20}px`, zIndex: index + 1 }}
            >
              <CardFace card={card} />
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-600">
        {foundationsDone
          ? 'Ganaste la partida. Animacion de caida activada.'
          : 'Arrastra o toca para mover: selecciona carta y luego toca columna/fundacion. Doble clic auto-fundacion.'}
      </p>
    </div>
  );
};

const Games = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = useMemo(
    () => [
      {
        id: 'snake',
        name: 'Snake',
        icon: 'Gamepad2',
        description: 'Snake funcional con cruceta (teclado y controles táctiles).',
        component: <SnakeGame />,
      },
      {
        id: 'memory',
        name: 'Memory Cards',
        icon: 'Sparkles',
        description: 'Juego de memoria completo con pares aleatorios y contador de movimientos.',
        component: <MemoryGame />,
      },
      {
        id: 'solitaire',
        name: 'Solitario',
        icon: 'Cards',
        description: 'Solitario Klondike simplificado con stock, waste, columnas y fundaciones.',
        component: <SolitaireGame />,
      },
    ],
    []
  );

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
                Volver a juegos
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-[calc(100%-40px)]">
              {games.find((game) => game.id === activeGame)?.component}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-6">
              Mini-juegos jugables para usar dentro del portfolio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveGame(game.id)}
                >
                  <div className="flex items-center mb-2">
                    {game.icon === 'Gamepad2' && <Gamepad2 className="w-6 h-6 text-blue-500 mr-2" />}
                    {game.icon === 'Sparkles' && <Sparkles className="w-6 h-6 text-purple-500 mr-2" />}
                    {game.icon === 'Cards' && <Layers className="w-6 h-6 text-green-600 mr-2" />}
                    <h3 className="text-lg font-bold text-gray-800">{game.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{game.description}</p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors text-sm">
                    Jugar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;


