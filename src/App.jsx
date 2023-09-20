import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

function App() {
  
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState(null);
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(0);
  const [hoveredSquares, setHoveredSquares] = useState([]);

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

    const existingSquare = hoveredSquares.find(sq => sq.i === i && sq.j === j);

    if (existingSquare) {

        setHoveredSquares(prev => prev.filter(sq => !(sq.i === i && sq.j === j)));
    } else {
        setHoveredSquares(prev => [...prev, { i, j }]);
    }

    setHoveredSquares(prev => {
        return [...prev].sort((a, b) => {
            if (a.i === b.i) {
                return a.j - b.j;
            }
            return a.i - b.i;
        });
    });
};



  return (
    <div className="App">
      <select onChange={e => {
        if (e.target.value === "") {
            setSelectedMode(null);
            setHoveredSquares([]);
            setGrid([]);
            setGridSize(0);
        } else {
            setSelectedMode(modes.find(mode => mode.id === e.target.value));
            setHoveredSquares([]);
        }
      }}>
        <option value=''>Pick a mode</option>
        {modes.map(mode => <option key={mode.id} value={mode.id}>{mode.name}</option>)}
      </select>
      <button onClick={handleStart} className='start-btn'>START</button>
      <div className="grid-container" style={{marginTop: '20px', width: '300px', height: '300px', overflow: 'auto'}}>
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
      {hoveredSquares && selectedMode &&(
        <>
        <h1>Hover squares</h1>
        <table>
        <thead>
          <tr>
            <th>Row</th>
            <th>Column</th>
          </tr>
        </thead>
        <tbody>
          {hoveredSquares.map((square, index) => (
            <tr key={index}>
              <td>{square.i}</td>
              <td>{square.j}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      )}
    </div>
  );
}

export default App;
