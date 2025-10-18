// AI-ASSIST: test scaffolds via ai/prompts/2025-10-19-tests-vitest.md
import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import gameReducer, { makeMoveAction, newGame, setTheme, toggleAnimations } from '../gameSlice';

describe('Game Slice', () => {
  const createTestStore = () => {
    return configureStore({
      reducer: {
        game: gameReducer,
      },
    });
  };

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const store = createTestStore();
      const state = store.getState().game;
      
      expect(state.game.currentPlayer).toBe('black');
      expect(state.game.status).toBe('playing');
      expect(state.game.score.black).toBe(2);
      expect(state.game.score.white).toBe(2);
      expect(state.settings.theme).toBe('classic');
      expect(state.settings.animations).toBe(true);
      expect(state.settings.sound).toBe(true);
    });
  });

  describe('Game Actions', () => {
    it('should handle new game action', () => {
      const store = createTestStore();
      store.dispatch(newGame());
      const state = store.getState().game;
      
      expect(state.game.currentPlayer).toBe('black');
      expect(state.game.status).toBe('playing');
      expect(state.game.score.black).toBe(2);
      expect(state.game.score.white).toBe(2);
    });

    it('should handle valid move', () => {
      const store = createTestStore();
      const initialState = store.getState().game;
      const validMoves = initialState.game.validMoves;
      
      if (validMoves.length > 0) {
        const firstMove = validMoves[0];
        store.dispatch(makeMoveAction(firstMove));
        const state = store.getState().game;
        
        expect(state.game.currentPlayer).toBe('white');
        expect(state.game.lastMove).toEqual(firstMove);
        expect(state.game.gameHistory).toHaveLength(1);
      }
    });
  });

  describe('Settings Actions', () => {
    it('should handle theme change', () => {
      const store = createTestStore();
      store.dispatch(setTheme('dark'));
      const state = store.getState().game;
      
      expect(state.settings.theme).toBe('dark');
    });

    it('should toggle animations', () => {
      const store = createTestStore();
      const initialState = store.getState().game;
      
      store.dispatch(toggleAnimations());
      const state = store.getState().game;
      
      expect(state.settings.animations).toBe(!initialState.settings.animations);
    });
  });
});

