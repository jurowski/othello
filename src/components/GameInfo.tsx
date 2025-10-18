/** AI-ASSIST: info panel draft via ai/prompts/2025-10-18-react-ui.md — copy & layout tweaked. */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { newGame, resetGame } from '../store/gameSlice';
import './GameInfo.css';

const GameInfo: React.FC = () => {
  const dispatch = useDispatch();
  const { game, settings } = useSelector((state: RootState) => state.game);
  const { currentPlayer, score, status, winner, validMoves } = game;

  const handleNewGame = () => {
    dispatch(newGame());
  };

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  const getStatusMessage = () => {
    if (status === 'finished') {
      if (winner === null) {
        return "It's a tie!";
      }
      return `Game Over! ${winner === 'black' ? 'Black' : 'White'} wins!`;
    }
    
    if (validMoves.length === 0) {
      return `${currentPlayer === 'black' ? 'Black' : 'White'} has no valid moves. Turn skipped.`;
    }
    
    return `${currentPlayer === 'black' ? 'Black' : 'White'}'s turn`;
  };

  const getCurrentPlayerClass = () => {
    if (status === 'finished') return 'finished';
    return currentPlayer === 'black' ? 'black-turn' : 'white-turn';
  };

  return (
    <div className={`game-info theme-${settings.theme}`}>
      <div className="score-board">
        <div className="score-item">
          <div className="score-label">Black</div>
          <div className="score-value">{score.black}</div>
        </div>
        <div className="score-divider">:</div>
        <div className="score-item">
          <div className="score-label">White</div>
          <div className="score-value">{score.white}</div>
        </div>
      </div>
      
      <div className="game-status">
        <div className={`status-message ${getCurrentPlayerClass()}`}>
          {getStatusMessage()}
        </div>
        {status === 'playing' && (
          <div className="valid-moves-count">
            {validMoves.length} valid moves available
          </div>
        )}
      </div>
      
      <div className="game-controls">
        <button 
          className="control-button new-game-button"
          onClick={handleNewGame}
        >
          New Game
        </button>
        <button 
          className="control-button reset-button"
          onClick={handleResetGame}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default GameInfo;
