import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMode, setGrid, setGridSize, setHoveredSquares } from '../redux/slices/appSlice'

function ModeSelector() {
    const dispatch = useDispatch();
    const modes = useSelector(state => state.app.modes);

    const handleChange = e => {
        if (e.target.value === "") {
            dispatch(setSelectedMode(null));
            dispatch(setHoveredSquares([]));
            dispatch(setGrid([]));
            dispatch(setGridSize(0));
        } else {
            const selected = modes.find(mode => mode.id === e.target.value);
            dispatch(setSelectedMode(selected));
            dispatch(setHoveredSquares([]));
        }
    };

    return (
        <select onChange={handleChange}>
            <option value=''>Pick a mode</option>
            {modes.map(mode => <option key={mode.id} value={mode.id}>{mode.name}</option>)}
        </select>
    );
}

export default ModeSelector;
