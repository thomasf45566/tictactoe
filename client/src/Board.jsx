import React from 'react';
import styled from 'styled-components';

const TD = styled.td`
  border: 1px solid black;
  height: 100px;
  width: 100px;
  font-size: 80px;
`;

const Board = ({ board, placePiece }) => (
  <div>
    {board.map((row, i) => (
      <tr>
        {row.map((grid, j) => (
          <TD onClick={() => placePiece(i, j)}>{!grid ? ' ' : (grid === 1 ? 'O' : 'X')}</TD>
        ))}
      </tr>
    ))}
  </div>
);

export default Board;