# Othello Game - Gain Life Developer Interview Challenge


> **Commit history reconstruction note**  
> The first working prototype was completed in a single session. I reconstructed a readable commit history afterwards so reviewers can follow the design decisions. Where AI assisted, I added `AI-ASSIST` comments in files and saved the exact prompts under `/ai/prompts` (indexed in `/docs/AI-USAGE.md`). I personally reviewed and refactored all AI-assisted code.


A modern, responsive Othello (Reversi) game built with React, TypeScript, and Redux Toolkit. This project demonstrates clean architecture, extensible design, and modern web development practices.

## 🎮 Features

- **Complete Othello Game Logic**: Full implementation of classic Othello rules
- **Modern UI/UX**: Responsive design with smooth animations and multiple themes
- **State Management**: Redux Toolkit for predictable state management
- **TypeScript**: Full type safety throughout the application
- **Extensible Architecture**: Designed to support future business requirements
- **Multiple Themes**: Classic, Modern, and Dark themes
- **Game History**: Track all moves and game states
- **Settings Panel**: Customizable game experience

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (recommended)
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

The application will be available at `http://localhost:5173`

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # React components
│   ├── GameBoard.tsx   # Main game board component
│   ├── GameInfo.tsx    # Score and game status display
│   └── GameSettings.tsx # Settings panel
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup
│   └── gameSlice.ts    # Game state management
├── types/              # TypeScript type definitions
│   └── game.ts         # Game-related types
├── utils/              # Utility functions
│   └── othelloLogic.ts # Core game logic
└── App.tsx             # Main application component
```

### Key Design Decisions

1. **Redux Toolkit**: Chosen for predictable state management and excellent TypeScript support
2. **Modular Architecture**: Separated concerns with distinct layers for UI, state, and logic
3. **Extensible Types**: Designed type system to support future business requirements
4. **Responsive Design**: Mobile-first approach with multiple breakpoints
5. **Theme System**: Built-in support for multiple visual themes

## 🎯 Game Rules

Othello is a strategy board game for two players. Players take turns placing pieces on an 8×8 board, with the goal of having the majority of pieces of their color at the end of the game.

### How to Play

1. **Starting Position**: Four pieces are placed in the center of the board
2. **Turns**: Players alternate turns, with Black going first
3. **Valid Moves**: A move is valid if it "flips" at least one opponent piece
4. **Flipping**: Pieces are flipped when they're between your new piece and another of your pieces
5. **Game End**: Game ends when no valid moves remain for either player
6. **Winner**: Player with the most pieces wins

## 🔧 Extensibility Features

The codebase is designed to support future business requirements:

### Planned Extensions

1. **Game Modes**:
   - AI opponent with difficulty levels
   - Online multiplayer
   - Tournament mode
   - Time-limited games

2. **Customization**:
   - Different board sizes (6x6, 10x10)
   - Custom piece designs
   - Sound effects and music
   - Advanced animations

3. **Analytics**:
   - Move history analysis
   - Performance statistics
   - Game replay functionality

4. **Social Features**:
   - Player profiles
   - Leaderboards
   - Achievements system

### Implementation Examples

The codebase already includes extensible patterns:

```typescript
// Game settings can be easily extended
export type GameSettings = {
  mode: GameMode;
  difficulty?: Difficulty;
  timeLimit?: number;
  boardSize?: number;
  customRules?: Record<string, any>;
};

// Redux slice supports easy addition of new actions
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Existing actions...
    // Future actions can be added here:
    // setGameMode, setDifficulty, setTimeLimit, etc.
  },
});
```

## 🧪 Testing

The project includes a testing setup with Vitest and React Testing Library:

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Unix Compatibility

The application is fully compatible with Unix systems and can be run with:

```bash
npm install
npm start
```

## 📄 License

This project is created for the Gain Life Developer Interview Challenge.

## 🤝 Contributing

This is an interview project, but the codebase is designed to be easily extensible for future development.

## 📞 Contact

For questions about this implementation, please refer to the interview discussion or code comments throughout the project.