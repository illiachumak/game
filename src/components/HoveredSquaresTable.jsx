import React from 'react';
import { useSelector } from 'react-redux';

function HoveredSquaresTable() {
    const hoveredSquares = useSelector(state => state.app.hoveredSquares);
    const selectedMode = useSelector(state => state.app.selectedMode);

    if (!hoveredSquares || !selectedMode) return null;

    return (
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
    );
}

export default HoveredSquaresTable;
