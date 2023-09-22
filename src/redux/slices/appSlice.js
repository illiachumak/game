import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    modes: [],
    selectedMode: null,
    grid: [],
    gridSize: 0,
    hoveredSquares: [],
    status: 'idle',
};

export const fetchModes = createAsyncThunk('app/fetchModes', async () => {
    const response = await axios.get('https://60816d9073292b0017cdd833.mockapi.io/modes');
    return response.data;
});

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedMode: (state, action) => {
            state.selectedMode = action.payload;
        },
        setGrid: (state, action) => {
            state.grid = action.payload;
        },
        setGridSize: (state, action) => {
            state.gridSize = action.payload;
        },
        setHoveredSquares: (state, action) => {
            state.hoveredSquares = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchModes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchModes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.modes = action.payload;
            })
            .addCase(fetchModes.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { setSelectedMode, setGrid, setGridSize, setHoveredSquares } = appSlice.actions;
export default appSlice.reducer;
