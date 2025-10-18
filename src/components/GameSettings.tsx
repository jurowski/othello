/** AI-ASSIST: settings panel draft via ai/prompts/2025-10-18-react-ui.md — theme options expanded. */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { setTheme, toggleAnimations, toggleSound } from '../store/gameSlice';
import './GameSettings.css';

const GameSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state: RootState) => state.game);
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (theme: 'classic' | 'modern' | 'dark') => {
    dispatch(setTheme(theme));
  };

  const handleToggleAnimations = () => {
    dispatch(toggleAnimations());
  };

  const handleToggleSound = () => {
    dispatch(toggleSound());
  };

  return (
    <div className="game-settings">
      <button 
        className="settings-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Game Settings"
      >
        ⚙️
      </button>
      
      {isOpen && (
        <div className="settings-panel">
          <div className="settings-header">
            <h3>Settings</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          
          <div className="settings-content">
            <div className="setting-group">
              <label className="setting-label">Theme</label>
              <div className="theme-options">
                {(['classic', 'modern', 'dark'] as const).map(theme => (
                  <button
                    key={theme}
                    className={`theme-option ${settings.theme === theme ? 'active' : ''}`}
                    onClick={() => handleThemeChange(theme)}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="setting-group">
              <label className="setting-label">Animations</label>
              <button
                className={`toggle-button ${settings.animations ? 'active' : ''}`}
                onClick={handleToggleAnimations}
              >
                {settings.animations ? 'ON' : 'OFF'}
              </button>
            </div>
            
            <div className="setting-group">
              <label className="setting-label">Sound</label>
              <button
                className={`toggle-button ${settings.sound ? 'active' : ''}`}
                onClick={handleToggleSound}
              >
                {settings.sound ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSettings;
