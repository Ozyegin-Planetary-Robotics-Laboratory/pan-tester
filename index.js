const express = require("express");
const app = express();
const port = 5000;

var baseCords = [41.030499, 29.259163];
var aresCords = [41.030535, 29.259133];
var aresCords1 = [41.030535, 29.259133];
var aresCords2 = [41.030534, 29.259193];

app.get("/gps/base", function (req, res) {
  let gps = {
    "Coordinates": baseCords
  }

  res.send(gps);
})

app.get("/gps/rover", function (req, res) {

  let gps = {
    "Coordinates": aresCords
  }

  res.send(gps);
})

// Loop to update the rover's coordinates to go back and forth between aresCords1 and aresCords2
// with a smooth interpolation

let i = 0;
setInterval(() => {
  if (i < 100) {
    aresCords[0] = aresCords1[0] + (aresCords2[0] - aresCords1[0]) * i / 100;
    aresCords[1] = aresCords1[1] + (aresCords2[1] - aresCords1[1]) * i / 100;
    i++;
  } else {
    let temp = aresCords1;
    aresCords1 = aresCords2;
    aresCords2 = temp;
    i = 0;
  }
}, 1000);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});