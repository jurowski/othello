import { Provider } from 'react-redux';
import { store } from './store';
import GameBoard from './components/GameBoard';
import GameInfo from './components/GameInfo';
import GameSettings from './components/GameSettings';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="app-header">
          <h1>Othello Game</h1>
          <p>A classic strategy game built with React & TypeScript</p>
        </header>
        
        <main className="app-main">
          <div className="game-container">
            <GameBoard />
            <div className="game-sidebar">
              <GameInfo />
              <GameSettings />
            </div>
          </div>
        </main>
        
        <footer className="app-footer">
          <p>Built for Gain Life Developer Interview Challenge</p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
