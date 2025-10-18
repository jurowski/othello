/** AI-ASSIST: initial skeleton via ai/prompts/2025-10-18-rules-engine.md — reviewed & refactored. */
import type { Board, Position, Player, MoveResult, GameState, GameHistoryEntry } from '../types/game';

export const BOARD_SIZE = 8;

/**
 * Creates an empty 8x8 Othello board
 */
export function createEmptyBoard(): Board {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
}

/**
 * Initializes the Othello board with starting pieces
 */
export function initializeBoard(): Board {
  const board = createEmptyBoard();
  const center = BOARD_SIZE / 2;
  
  // Place initial pieces
  board[center - 1][center - 1] = 'white';
  board[center - 1][center] = 'black';
  board[center][center - 1] = 'black';
  board[center][center] = 'white';
  
  return board;
}

/**
 * Creates initial game state
 */
export function createInitialGameState(): GameState {
  const board = initializeBoard();
  return {
    board,
    currentPlayer: 'black',
    status: 'playing',
    score: { black: 2, white: 2 },
    lastMove: null,
    validMoves: getValidMoves(board, 'black'),
    gameHistory: [],
    winner: null,
  };
}

/**
 * Gets all valid moves for a player on the current board
 */
export function getValidMoves(board: Board, player: Player): Position[] {
  if (!player) return [];
  
  const validMoves: Position[] = [];
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === null && isValidMove(board, row, col, player)) {
        validMoves.push({ row, col });
      }
    }
  }
  
  return validMoves;
}

/**
 * Checks if a move is valid for a player
 */
export function isValidMove(board: Board, row: number, col: number, player: Player): boolean {
  if (!player || board[row][col] !== null) return false;
  
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  
  for (const [dRow, dCol] of directions) {
    if (canFlipInDirection(board, row, col, dRow, dCol, player)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Checks if pieces can be flipped in a specific direction
 */
function canFlipInDirection(
  board: Board, 
  row: number, 
  col: number, 
  dRow: number, 
  dCol: number, 
  player: Player
): boolean {
  if (!player) return false;
  
  const opponent = player === 'black' ? 'white' : 'black';
  let currentRow = row + dRow;
  let currentCol = col + dCol;
  let foundOpponent = false;
  
  // Check if there's at least one opponent piece in this direction
  while (currentRow >= 0 && currentRow < BOARD_SIZE && 
         currentCol >= 0 && currentCol < BOARD_SIZE) {
    const cell = board[currentRow][currentCol];
    
    if (cell === null) return false;
    if (cell === player) return foundOpponent;
    if (cell === opponent) foundOpponent = true;
    
    currentRow += dRow;
    currentCol += dCol;
  }
  
  return false;
}

/**
 * Gets all pieces that would be flipped by a move
 */
function getFlippedPieces(
  board: Board, 
  row: number, 
  col: number, 
  player: Player
): Position[] {
  if (!player) return [];
  
  const flippedPieces: Position[] = [];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  
  for (const [dRow, dCol] of directions) {
    const directionFlipped = getFlippedInDirection(board, row, col, dRow, dCol, player);
    flippedPieces.push(...directionFlipped);
  }
  
  return flippedPieces;
}

/**
 * Gets pieces flipped in a specific direction
 */
function getFlippedInDirection(
  board: Board,
  row: number,
  col: number,
  dRow: number,
  dCol: number,
  player: Player
): Position[] {
  if (!player) return [];
  
  const opponent = player === 'black' ? 'white' : 'black';
  const flipped: Position[] = [];
  let currentRow = row + dRow;
  let currentCol = col + dCol;
  
  while (currentRow >= 0 && currentRow < BOARD_SIZE && 
         currentCol >= 0 && currentCol < BOARD_SIZE) {
    const cell = board[currentRow][currentCol];
    
    if (cell === null) return [];
    if (cell === player) return flipped;
    if (cell === opponent) flipped.push({ row: currentRow, col: currentCol });
    
    currentRow += dRow;
    currentCol += dCol;
  }
  
  return [];
}

/**
 * Makes a move on the board and returns the result
 */
export function makeMove(
  board: Board, 
  row: number, 
  col: number, 
  player: Player
): MoveResult {
  if (!player || !isValidMove(board, row, col, player)) {
    return {
      success: false,
      newBoard: board,
      flippedPieces: [],
      newScore: { black: 0, white: 0 },
      message: 'Invalid move'
    };
  }
  
  const newBoard = board.map(row => [...row]);
  const flippedPieces = getFlippedPieces(board, row, col, player);
  
  // Place the piece
  newBoard[row][col] = player;
  
  // Flip the pieces
  flippedPieces.forEach(({ row: flipRow, col: flipCol }) => {
    newBoard[flipRow][flipCol] = player;
  });
  
  // Calculate new score
  const newScore = calculateScore(newBoard);
  
  return {
    success: true,
    newBoard,
    flippedPieces,
    newScore,
  };
}

/**
 * Calculates the score for both players
 */
export function calculateScore(board: Board): { black: number; white: number } {
  let black = 0;
  let white = 0;
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 'black') black++;
      if (board[row][col] === 'white') white++;
    }
  }
  
  return { black, white };
}

/**
 * Checks if the game is over
 */
export function isGameOver(board: Board, currentPlayer: Player): boolean {
  const validMoves = getValidMoves(board, currentPlayer);
  if (validMoves.length > 0) return false;
  
  // Check if opponent has valid moves
  const opponent = currentPlayer === 'black' ? 'white' : 'black';
  const opponentMoves = getValidMoves(board, opponent);
  
  return opponentMoves.length === 0;
}

/**
 * Determines the winner of the game
 */
export function getWinner(score: { black: number; white: number }): Player {
  if (score.black > score.white) return 'black';
  if (score.white > score.black) return 'white';
  return null; // Tie
}

/**
 * Switches to the next player
 */
export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === 'black' ? 'white' : 'black';
}

/**
 * Creates a game history entry
 */
export function createHistoryEntry(
  move: Position,
  player: Player,
  board: Board,
  score: { black: number; white: number }
): GameHistoryEntry {
  return {
    move,
    player: player!,
    board: board.map(row => [...row]),
    score: { ...score },
    timestamp: Date.now(),
  };
}
