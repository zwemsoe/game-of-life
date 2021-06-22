import { useState } from "react";
import useInterval from "../useInterval";
import "./Board.css";

const createBoard = (width, height) => {
  let board = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push({ x: i, y: j, isAlive: false });
    }
    board.push(row);
  }
  return board;
};

const getNumberOfAliveCellsInNeighbours = (board, cell, width, height) => {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [1, 0],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];
  let count = 0;
  for (let i = 0; i < dirs.length; i++) {
    if (cell.x > 0 && cell.x < height - 1 && cell.y > 0 && cell.y < width - 1) {
      const x_dir = dirs[i][0];
      const y_dir = dirs[i][1];
      const neighbour = board[cell.x + x_dir][cell.y + y_dir];
      if (neighbour.isAlive) {
        count++;
      }
    }
  }
  return count;
};

export default function Board({ width, height }) {
  const [board, setBoard] = useState(createBoard(width, height));
  const [simulationOn, setSimulation] = useState(false);
  const [delay, setDelay] = useState(1000);

  const handleCellClick = (cell) => {
    const { x, y, isAlive } = cell;
    let copy = [...board];
    copy[x][y] = { x, y, isAlive: !isAlive };
    setBoard(copy);
  };

  const handleRandom = () => {
    const total = Math.floor((width * height) / 4);
    let count = 0;
    let copy = [...createBoard(width, height)];

    while (count <= total) {
      const xCoord = Math.floor(Math.random() * height);
      const yCoord = Math.floor(Math.random() * width);
      copy[xCoord][yCoord] = { x: xCoord, y: yCoord, isAlive: true };
      count++;
    }
    setBoard(copy);
  };

  const calculateNewGeneration = () => {
    let copy = [...board];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const cell = copy[i][j];
        const count = getNumberOfAliveCellsInNeighbours(
          board,
          cell,
          width,
          height
        );
        if (cell.isAlive) {
          if (count < 2 || count > 3) {
            cell.isAlive = false;
          }
        } else if (count === 3) {
          cell.isAlive = true;
        }
      }
    }
    setBoard(copy);
  };

  useInterval(
    () => {
      calculateNewGeneration();
    },
    simulationOn ? delay : null
  );

  const resetSimulation = () => {
    setSimulation(false);
    setBoard(createBoard(width, height));
  };

  return (
    <div>
      <div className='board' style={{ marginTop: "20px" }}>
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className='row'>
            {row.map((cell, cellIdx) => {
              return (
                <div
                  key={cellIdx}
                  className='cell'
                  style={{ background: cell.isAlive ? "white" : "#282c34" }}
                  onClick={() => !simulationOn && handleCellClick(cell)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "2em",
        }}
      >
        <div>
          <div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ color: "white" }}>Speed(msecs): </label>
              <input
                name='delay'
                type='number'
                value={delay}
                onChange={(e) =>
                  e.target.value >= 100 && setDelay(e.target.value)
                }
                min='100'
                max='5000'
              />
            </div>
            <button
              disabled={simulationOn}
              onClick={() => setSimulation(true)}
              style={{ marginRight: "10px" }}
            >
              Run
            </button>
            <button
              onClick={() => setSimulation(false)}
              style={{ marginRight: "10px" }}
            >
              Stop
            </button>
            <button
              onClick={handleRandom}
              disabled={simulationOn}
              style={{ marginRight: "10px" }}
            >
              Random Population
            </button>
            <button onClick={resetSimulation} style={{ marginRight: "10px" }}>
              Reset
            </button>
            <button onClick={() => window.location.reload()}>Back</button>
          </div>
          <p style={{ color: "white" }}>Click on the grid to populate cells.</p>
        </div>
      </div>
    </div>
  );
}
