# Prompt: Pure TypeScript Othello Rules Engine

**Context**: Build a framework-agnostic rules module for Othello (Reversi) to be used by a React app.

**Ask**
Design a pure TypeScript rules engine with immutable operations. Provide:
- `createEmptyBoard(size=8)`
- `initializeBoard()` with the classic 4 starting discs
- `getValidMoves(board, player)`
- `isValidMove(board, row, col, player)`
- `makeMove(board, row, col, player)` => returns `{ success, newBoard, flippedPieces, newScore }`
- `calculateScore(board)`
- `isGameOver(board)` / `getWinner(board)`
- `getNextPlayer(board, currentPlayer)` when the opponent has no moves
- `createHistoryEntry(board, move, player)` for move logs

**Constraints**
- No DOM, no IO, no React. Return new arrays (no mutation).
- Use simple types: `Player = 'black' | 'white' | null`; `Board = (Player)[][]`.

**Follow-ups I applied**
- Early-out scanning per direction for speed
- Flattened scoring to avoid recount during move gen
- Added pass-turn behavior when opponent has no moves
