import React, { useEffect } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchModes, setGrid, setGridSize, setHoveredSquares } from './redux/slices/appSlice';
import ModeSelector from './components/ModeSelector';
import Grid from './components/Grid';
import HoveredSquaresTable from './components/HoveredSquaresTable';

function App() {
    const dispatch = useDispatch();
    const {status, selectedMode} = useSelector(state => state.app);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchModes());
        }
    }, [status, dispatch]);

    const handleStart = () => {
        if (!selectedMode) return;
        const size = selectedMode.field;
        dispatch(setGridSize(size));
        dispatch(setGrid(new Array(size).fill(0).map(row => new Array(size).fill(0))));
        dispatch(setHoveredSquares([]))
    };

    return (
        <div className="App">
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && (
                <>
                    <ModeSelector />
                    <button onClick={handleStart} className='start-btn'>START</button>
                    <Grid />
                    <HoveredSquaresTable />
                </>
            )}
            {status === 'failed' && <p>Failed to load modes.</p>}
        </div>
    );
}

export default App;
