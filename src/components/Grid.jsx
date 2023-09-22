import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGrid, setHoveredSquares} from '../redux/slices/appSlice'

function Grid() {
    const dispatch = useDispatch();
    const grid = useSelector(state => state.app.grid);
    const gridSize = useSelector(state => state.app.gridSize);
    const hoveredSquares = useSelector(state => state.app.hoveredSquares);

    const handleHover = (i, j) => {
        const newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[i][j] = newGrid[i][j] === 0 ? 1 : 0;
        dispatch(setGrid(newGrid));

        const existingSquare = hoveredSquares.find(sq => sq.i === i && sq.j === j);

        if (existingSquare) {
            const filteredSquares = hoveredSquares.filter(sq => !(sq.i === i && sq.j === j));
            dispatch(setHoveredSquares(filteredSquares));
        } else {
            const updatedSquares = [...hoveredSquares, { i, j }];
            dispatch(setHoveredSquares(updatedSquares));
        }
    };

    return (
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
    );
}

export default Grid;
