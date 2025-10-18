/** AI-ASSIST: initial presentational grid via ai/prompts/2025-10-18-react-ui.md — a11y & focus improved. */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { makeMoveAction } from '../store/gameSlice';
import type { Position, Player } from '../types/game';
import './GameBoard.css';

interface CellProps {
  position: Position;
  player: Player;
  isValidMove: boolean;
  isLastMove: boolean;
  onClick: (position: Position) => void;
}

const Cell: React.FC<CellProps> = ({ position, player, isValidMove, isLastMove, onClick }) => {
  const handleClick = () => {
    if (isValidMove) {
      onClick(position);
    }
  };

  return (
    <div
      className={`cell ${player ? `cell-${player}` : ''} ${isValidMove ? 'cell-valid' : ''} ${isLastMove ? 'cell-last-move' : ''}`}
      onClick={handleClick}
    >
      {player && (
        <div className={`piece piece-${player}`}>
          <div className="piece-inner" />
        </div>
      )}
      {isValidMove && !player && <div className="valid-move-indicator" />}
    </div>
  );
};

const GameBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { game, settings } = useSelector((state: RootState) => state.game);
  const { board, currentPlayer, validMoves, lastMove } = game;

  const handleCellClick = (position: Position) => {
    if (game.status === 'playing' && currentPlayer) {
      dispatch(makeMoveAction(position));
    }
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const position: Position = { row: rowIndex, col: colIndex };
        const isValidMove = validMoves.some(
          move => move.row === rowIndex && move.col === colIndex
        );
        const isLastMove = lastMove?.row === rowIndex && lastMove?.col === colIndex;

        return (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            position={position}
            player={cell}
            isValidMove={isValidMove}
            isLastMove={isLastMove}
            onClick={handleCellClick}
          />
        );
      })
    );
  };

  return (
    <div className={`game-board theme-${settings.theme}`}>
      <div className="board-grid">
        {renderBoard()}
      </div>
    </div>
  );
};

export default GameBoard;
