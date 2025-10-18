// AI-ASSIST: test scaffolds via ai/prompts/2025-10-19-tests-vitest.md
import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  initializeBoard,
  createInitialGameState,
  isValidMove,
  makeMove,
  calculateScore,
  getWinner,
  getNextPlayer,
} from '../othelloLogic';

describe('Othello Game Logic', () => {
  describe('Board Creation', () => {
    it('should create an empty 8x8 board', () => {
      const board = createEmptyBoard();
      expect(board).toHaveLength(8);
      expect(board[0]).toHaveLength(8);
      expect(board.every(row => row.every(cell => cell === null))).toBe(true);
    });

    it('should initialize board with starting pieces', () => {
      const board = initializeBoard();
      expect(board[3][3]).toBe('white');
      expect(board[3][4]).toBe('black');
      expect(board[4][3]).toBe('black');
      expect(board[4][4]).toBe('white');
    });
  });

  describe('Move Validation', () => {
    it('should validate moves correctly', () => {
      const board = initializeBoard();
      
      // Valid moves for black player
      expect(isValidMove(board, 2, 3, 'black')).toBe(true);
      expect(isValidMove(board, 3, 2, 'black')).toBe(true);
      expect(isValidMove(board, 4, 5, 'black')).toBe(true);
      expect(isValidMove(board, 5, 4, 'black')).toBe(true);
      
      // Invalid moves
      expect(isValidMove(board, 0, 0, 'black')).toBe(false);
      expect(isValidMove(board, 3, 3, 'black')).toBe(false); // Already occupied
      expect(isValidMove(board, 1, 1, 'black')).toBe(false);
    });
  });

  describe('Move Execution', () => {
    it('should make valid moves and flip pieces', () => {
      const board = initializeBoard();
      const result = makeMove(board, 2, 3, 'black');
      
      expect(result.success).toBe(true);
      expect(result.newBoard[2][3]).toBe('black');
      expect(result.newBoard[3][3]).toBe('black'); // Flipped from white
      expect(result.flippedPieces).toContainEqual({ row: 3, col: 3 });
    });

    it('should reject invalid moves', () => {
      const board = initializeBoard();
      const result = makeMove(board, 0, 0, 'black');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid move');
    });
  });

  describe('Score Calculation', () => {
    it('should calculate score correctly', () => {
      const board = initializeBoard();
      const score = calculateScore(board);
      
      expect(score.black).toBe(2);
      expect(score.white).toBe(2);
    });
  });

  describe('Game State', () => {
    it('should create initial game state correctly', () => {
      const gameState = createInitialGameState();
      
      expect(gameState.currentPlayer).toBe('black');
      expect(gameState.status).toBe('playing');
      expect(gameState.score.black).toBe(2);
      expect(gameState.score.white).toBe(2);
      expect(gameState.validMoves.length).toBeGreaterThan(0);
    });

    it('should determine next player correctly', () => {
      expect(getNextPlayer('black')).toBe('white');
      expect(getNextPlayer('white')).toBe('black');
    });

    it('should determine winner correctly', () => {
      expect(getWinner({ black: 5, white: 3 })).toBe('black');
      expect(getWinner({ black: 3, white: 5 })).toBe('white');
      expect(getWinner({ black: 4, white: 4 })).toBe(null); // Tie
    });
  });
});
