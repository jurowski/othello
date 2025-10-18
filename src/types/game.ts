export type Player = 'black' | 'white' | null;

export type CellState = Player;

export type Position = {
  row: number;
  col: number;
};

export type Board = CellState[][];

export type GameStatus = 'waiting' | 'playing' | 'finished';

export type GameState = {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  score: {
    black: number;
    white: number;
  };
  lastMove: Position | null;
  validMoves: Position[];
  gameHistory: GameHistoryEntry[];
  winner: Player;
};

export type GameHistoryEntry = {
  move: Position;
  player: Player;
  board: Board;
  score: { black: number; white: number };
  timestamp: number;
};

export type MoveResult = {
  success: boolean;
  newBoard: Board;
  flippedPieces: Position[];
  newScore: { black: number; white: number };
  message?: string;
};

// Extensibility: These types allow for future business requirements
export type GameMode = 'classic' | 'timed' | 'ai' | 'multiplayer';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameSettings = {
  mode: GameMode;
  difficulty?: Difficulty;
  timeLimit?: number; // in seconds
  boardSize?: number; // for future board size variations
  customRules?: Record<string, any>; // for future rule modifications
};

export type GameConfig = {
  settings: GameSettings;
  theme?: 'classic' | 'modern' | 'dark';
  animations?: boolean;
  sound?: boolean;
};

