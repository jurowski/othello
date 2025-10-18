/** AI-ASSIST: slice scaffold via ai/prompts/2025-10-18-redux-slice.md — edited for history, guards. */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GameState, Position } from '../types/game';
import {
  createInitialGameState,
  makeMove,
  getValidMoves,
  isGameOver,
  getWinner,
  getNextPlayer,
  createHistoryEntry
} from '../utils/othelloLogic';

interface GameSliceState {
  game: GameState;
  settings: {
    theme: 'classic' | 'modern' | 'dark';
    animations: boolean;
    sound: boolean;
  };
}

const initialState: GameSliceState = {
  game: createInitialGameState(),
  settings: {
    theme: 'classic',
    animations: true,
    sound: true,
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Core game actions
    makeMove: (state, action: PayloadAction<Position>) => {
      const { row, col } = action.payload;
      const { game } = state;
      
      if (game.status !== 'playing' || !game.currentPlayer) return;
      
      const moveResult = makeMove(game.board, row, col, game.currentPlayer);
      
      if (!moveResult.success) return;
      
      // Update board and score
      game.board = moveResult.newBoard;
      game.score = moveResult.newScore;
      game.lastMove = { row, col };
      
      // Add to history
      const historyEntry = createHistoryEntry(
        { row, col },
        game.currentPlayer,
        game.board,
        game.score
      );
      game.gameHistory.push(historyEntry);
      
      // Check if game is over
      const nextPlayer = getNextPlayer(game.currentPlayer);
      const isOver = isGameOver(game.board, nextPlayer);
      
      if (isOver) {
        game.status = 'finished';
        game.winner = getWinner(game.score);
        game.validMoves = [];
      } else {
        // Switch to next player
        game.currentPlayer = nextPlayer;
        game.validMoves = getValidMoves(game.board, nextPlayer);
        
        // If next player has no valid moves, skip turn
        if (game.validMoves.length === 0) {
          const skipPlayer = getNextPlayer(nextPlayer);
          game.currentPlayer = skipPlayer;
          game.validMoves = getValidMoves(game.board, skipPlayer);
        }
      }
    },
    
    // Game control actions
    newGame: (state) => {
      state.game = createInitialGameState();
    },
    
    resetGame: (state) => {
      state.game = createInitialGameState();
    },
    
    // Settings actions
    setTheme: (state, action: PayloadAction<'classic' | 'modern' | 'dark'>) => {
      state.settings.theme = action.payload;
    },
    
    toggleAnimations: (state) => {
      state.settings.animations = !state.settings.animations;
    },
    
    toggleSound: (state) => {
      state.settings.sound = !state.settings.sound;
    },
    
    // Extensibility: Future business requirements can be added here
    // Examples:
    // - setGameMode: (state, action: PayloadAction<GameMode>) => { ... }
    // - setDifficulty: (state, action: PayloadAction<Difficulty>) => { ... }
    // - setTimeLimit: (state, action: PayloadAction<number>) => { ... }
    // - setCustomRules: (state, action: PayloadAction<Record<string, any>>) => { ... }
  },
});

export const {
  makeMove: makeMoveAction,
  newGame,
  resetGame,
  setTheme,
  toggleAnimations,
  toggleSound,
} = gameSlice.actions;

export default gameSlice.reducer;
