import React from 'react';
import TheSnek from './components/TheSnek'
import TheFood from './components/TheFood'
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="header">
        <h1>Snek</h1>
      </header>
      <TheSnek />
      <TheFood />
    </div>
  );
}

export default App;
