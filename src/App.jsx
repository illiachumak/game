import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

function App() {
  
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState(null);
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(0);

  useEffect(() => {
    axios.get('https://60816d9073292b0017cdd833.mockapi.io/modes')
      .then(response => {
        setModes(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleStart = () => {
    if (!selectedMode) return;
    const size = selectedMode.field;
    setGridSize(size);
    setGrid(new Array(size).fill(0).map(row => new Array(size).fill(0)));
  };

  const handleHover = (i, j) => {
    const newGrid = [...grid];
    newGrid[i][j] = newGrid[i][j] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  return (
    <div className="App">
      <select onChange={e => setSelectedMode(modes.find(mode => mode.id === e.target.value))}>
        <option>Pick a mode</option>
        {modes.map(mode => <option key={mode.id} value={mode.id}>{mode.name}</option>)}
      </select>
      <button onClick={handleStart} className='start-btn'>START</button>
      <div className="grid" style={{width: (25 * gridSize) + 'px'}}> 
        {grid.map((row, i) => (
          <div key={i} className="grid-row">
            {row.map((cell, j) => (
              <div
                key={j}
                className={`square ${cell === 1 ? 'blue' : ''}`}
                onMouseOver={() => handleHover(i, j)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
