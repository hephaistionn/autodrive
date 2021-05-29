
const varianceMatrix = [
  0.005,
  0.005,
];

const distanceMax = 14000

module.exports = {
  showSensor: true,

  initStates: {
    x: 400,
    y: 90,
    bodyDirection: Math.PI / 30,
    speed: 0.0,
  },

  config: {
    sensorLimit: 200,
    cars: 1,
    sensors: [Math.PI / 8, -Math.PI / 8],
    initMatrix: [0, 0],
  },

  updateDirection: function (matrix, sensors) {
    return 0; //TODO
  },

  updateAcceleration: function (matrix, sensors, direction, speed) {
    return 0; //TODO
  },

  updateMatrix(bestMatrix, bestDistance, currentMatrix, currentDistance) {
    const matrix = bestMatrix;
    //TODO
    return matrix;
  }
}