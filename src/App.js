import { Button, TextField } from "@mui/material";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function App() {
  const [heights, setHeights] = useState([0, 4, 0, 0, 0, 6, 0, 6, 4, 0]);
  const [waterUnits, setWaterUnits] = useState(0);

  useEffect(() => {
    if (heights.length > 10) {
      alert("Please give only ten values");
      setHeights([0, 4, 0, 0, 0, 6, 0, 6, 4, 0]);
    }
    heights.map((e) => {
      if (e > 10) {
        alert("Please Enter the Value less than or equal to 10");
        setHeights([0, 4, 0, 0, 0, 6, 0, 6, 4, 0]);
      }
    });

    setWaterUnits(calculateWaterUnits(heights));
  }, [heights]);

  function calculateWaterUnits(heights) {
    let totalWaterUnits = 0;
    let temp = [];
    let count = 0;
    for (let i = 0; i < heights.length; i++) {
      if (temp.length < 2 && heights[i] !== 0) {
        temp.push(heights[i]);
      }
      if (temp.length === 1 && heights[i] === 0) {
        count++;
      } else if (temp.length === 2) {
        let val = Math.min(...temp);
        totalWaterUnits += val * count;
        count = 0;
        temp.shift();
      }
    }

    return totalWaterUnits;
  }

  const tableData = createTableData(heights, waterUnits);
  return (
    <div className="App">
      <h1>Water Tank Problem</h1>
      <TextField
        id="outlined-basic"
        label="Values"
        variant="outlined"
        type="text"
        value={heights.join(",")}
        onChange={(e) => setHeights(e.target.value.split(",").map(Number))}
      />
      <br />
      <Button variant="contained" onClick={() => calculateWaterUnits(heights)}>
        Calculate
      </Button>
      <div className="total-water-unit">
        <h3>Total Water Units:</h3>
        <span>{waterUnits}</span>
      </div>
      <h2>Table Visualization</h2>
      <div className="rotate-table">
        <Table striped bordered hover>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={row.blockNumber}>
                {tableData.map((row) => (
                  <td
                    key={row.blockNumber}
                    className={
                      row.height > 0
                        ? index <= row.height
                          ? "wall-unit"
                          : "empty"
                        : row.waterUnits > 0 && index <= row.waterUnits
                        ? "water-unit"
                        : "empty"
                    }
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <br />
      <div className="note">
        <h3>Note:</h3>
        <p>
          If you can't able to edit the value, please select the value which you
          want to edit and replace with value which you want to give
        </p>
      </div>
    </div>
  );
}
function createTableData(heights, waterUnits) {
  const data = [];

  for (let i = 0; i < heights.length; i++) {
    const waterInBlock =
      Math.min(
        calculateWaterToLeft(heights, i),
        calculateWaterToRight(heights, i)
      ) - heights[i];

    data.push({
      blockNumber: i + 1,
      height: heights[i],
      waterUnits: waterInBlock,
    });
  }
  data.reverse();
  return data;
}

function calculateWaterToLeft(heights, index) {
  let maxHeight = 0;

  for (let i = 0; i <= index; i++) {
    maxHeight = Math.max(maxHeight, heights[i]);
  }

  return maxHeight;
}

function calculateWaterToRight(heights, index) {
  let maxHeight = 0;

  for (let i = index; i < heights.length; i++) {
    maxHeight = Math.max(maxHeight, heights[i]);
  }

  return maxHeight;
}
export default App;
