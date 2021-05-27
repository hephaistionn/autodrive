# Autodrive

# Installation

npm i

```sh
$ npm run dev
```

Environment to desing a learning AI. 
AI must drive small cars.
Edit the '**editable.js**' to desing the AI

### Number UpdateDirection (matrix, sensors)

To compute direction in Rad. Called for each cars.

### Number UpdateAcceleration(matrix, sensors) 

To compute acceleration px /ms. Called for each cars.

### Array UpdateMatrix(bestMatrix, bestDistance, currentMatrix, currentDistance)  

To Compute a learning matrix. Triggered if the car crashed or starts.
BestMatrix is the most efficient car matrix of first matrix version.
The most efficient car is the one that drives the farthest (bestDistance)
CurrentMatrix is the matrix of the previous iteration;
currentDistance is the distance of the previous iteration before crashed;

Improve the best matrix for each iteration.

### Variables
**matrix** => your matrix, free length   (Aaray[Float])
**sensors.direction** => sensor direction in Rad.  (Const Float)
**sensors.speed** => wall approach speed px/ms (Float)
**sensors.norm**  => distance between wall and sensor in  px (Float)
**sensors.norm2**  => norm transformed, range 0 to 1. When 0 wall too far 1 collision  (Float)

**config.sensorPower** => max distance of sensors in px (Float)
**config.cars** => cars numbers (Float)
**config.sensors** => car sensors. Each value is one direction sensor. Free length (Array Float)  
**config.initMatrix** => first matrix iteration. Free length (Array Float)  




Work with nodejs or browser


License
----