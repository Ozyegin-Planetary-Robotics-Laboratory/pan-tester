const express = require("express");
const app = express();
const port = 5000;

var baseCords = [41.030499, 29.259163];
var aresCords = [38.4063641, -110.7916091];
var aresCords1 = [38.4065641, -110.7926091];
var aresCords2 = [38.4061641, -110.7906091];

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // You can set specific origins instead of '*'
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
  

app.get("/gps/base", function (req, res) {
  let gps = {
    coordinates: baseCords
  }

  res.send(gps);
})

app.get("/gps/rover", function (req, res) {

  let gps = {
    coordinates: aresCords
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