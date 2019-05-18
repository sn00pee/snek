import React from 'react';
import TheSnek from './components/TheSnek'
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="header">
        <h1>Snek</h1>
      </header>
      <TheSnek />
    </div>
  );
}

export default App;
