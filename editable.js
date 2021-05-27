
module.exports = {
  showSensor: false,

  initStates: {
    x: 400,
    y: 90,
    bodyDirection: Math.PI / 30,
    speed: 0.4,
  },

  config: {
    sensorLimit: 400,
    cars: 20,
    sensors: [
      Math.PI / 8,
      -Math.PI / 8,
    ],
    initMatrix: [
      0, 
      0
    ]
  },

  updateDirection: function (matrix, sensors) {
    return - matrix[0] * sensors[0].norm2 + matrix[1] * sensors[1].norm2;
  },

  updateAcceleration:function (matrix, sensors) {
    return 0;
  },

  updateMatrix(bestMatrix, bestDistance, currentMatrix, currentDistance ) {
    const matrix = bestMatrix;
    matrix[0] += (Math.random() - 0.5) * 2 * 0.15;
    matrix[1] = matrix[0]; //sym
    return matrix;
  }
}