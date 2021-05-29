
const varianceMatrix = [
  0.005,
  0.005,
  0.002,
  0.002,
  0.002,
];

const distanceMax = 14000

module.exports = {
  showSensor: false,

  initStates: {
    x: 400,
    y: 90,
    bodyDirection: Math.PI / 30,
    speed: 0.0,
  },

  config: {
    sensorLimit: 200,
    cars: 100,
    sensors: [Math.PI / 6, -Math.PI / 6, Math.PI / 10, -Math.PI / 10],
    initMatrix: [0, 0, 0, 0, 0,],
  },

  updateDirection: function (matrix, sensors) {
    return (
      - (matrix[0] * sensors[0].norm2 + matrix[1] * sensors[2].norm2)
      + (matrix[0] * sensors[1].norm2 + matrix[1] * sensors[3].norm2)
    );
  },

  updateAcceleration: function (matrix, sensors, direction, speed) {
    return (matrix[2] * Math.abs(direction)) + (matrix[3] * speed) + matrix[4];
  },

  updateMatrix(bestMatrix, bestDistance, currentMatrix, currentDistance) {
    const matrix = bestMatrix;

    let varFactor = 1;
    if (Math.random() > 0.8) { //20%
      varFactor = 10;
      if (Math.random() > 0.75) { //5%
        varFactor = 100;
      }
    }

    const index = Math.floor(Math.random() * matrix.length); //one factor at a time.
    matrix[index] += (Math.random() - 0.5) * 2 * varianceMatrix[index] * varFactor;
    return matrix;
  }
}