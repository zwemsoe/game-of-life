import { useEffect, useState } from "react";
import Board from "./Board/Board";

function App() {
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(30);
  const [boardCreated, setBoardCreated] = useState(false);

  return (
    <div>
      {boardCreated ? (
        <>
          <div
            style={{
              display: "grid",
              placeItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                {" "}
                Simulation Playground
              </h1>
              <Board width={width} height={height} />
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            marginTop: "20%",
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h1
              style={{
                color: "white",
              }}
            >
              {" "}
              Conway's Game of Life Simulation
            </h1>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "white" }}>Width: </label>
              <input
                name='width'
                type='number'
                min='30'
                max='120'
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <label style={{ color: "white" }}>Height: </label>
              <input
                name='height'
                type='number'
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min='30'
                max='500'
                style={{ marginRight: "10px" }}
              />
              <button onClick={() => setBoardCreated(true)}>Create Grid</button>
            </div>
            <a
              href='https://github.com/zwemsoe/game-of-life'
              target='_blank'
              rel='noreferrer'
              style={{ color: "rgb(134, 154, 189)", marginRight: "10px" }}
            >
              Github
            </a>
            <a
              href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
              target='_blank'
              rel='noreferrer'
              style={{ color: "rgb(134, 154, 189)" }}
            >
              Wikipedia
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
