# Prompt: Redux Toolkit Slice for Othello

**Context**: Wire the pure rules engine into app state.

**Ask**
Create an RTK slice exposing:
- `newGame()`
- `makeMove({row, col})`
- `undo()` / `redo()` (optional)
- `setTheme('classic'|'modern'|'dark')`
- `toggleAnimations()` / `toggleSound()`

**State shape**
```
{
  game: { board, currentPlayer, status, score, winner, history: [] },
  settings: { theme, animations, sound }
}
```

**Notes**
- Use helpers from the rules module for legal moves, scoring, next-player logic.
- Keep reducers simple and pure, push details into the rules module where possible.

**Edits I made**
- Added history entries with timestamps & scores
- Ensured no-op if move invalid or game finished
