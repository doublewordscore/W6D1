const Asteroid = require("./asteroid");
const Ship = require("./ship");

const asteroids = [];

const Game = function () {
  this.dimX = Game.DIM_X;
  this.dimY = Game.DIM_Y;
  this.numAsteroids = Game.NUM_ASTEROIDS;
  this.addAsteroids();
  this.ship = new Ship({ pos: this.randomPosition(), game: this });
};

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 8;

Game.prototype.randomPosition = function () {
  const x_start = Math.random() * this.dimX;
  const y_start = Math.random() * this.dimY;
  return [x_start, y_start];
};

Game.prototype.allObjects = function () {
  const all = [this.ship];
  return all.concat(asteroids);
};

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.numAsteroids; i++) {
    const babyAsteroid = new Asteroid({ pos: this.randomPosition(), game: this });
    asteroids.push(babyAsteroid);
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.dimX, this.dimY);
  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(function (object) {
    object.move();
  });
};

Game.prototype.wrap = function (pos) {
  asteroids.forEach((asteroid) => {
    if (asteroid.pos[0] > this.dimX) {
      asteroid.pos[0] -= this.dimX;
    } else if (asteroid.pos[0] < 0) {
      asteroid.pos[0] += this.dimX;
    } else if (asteroid.pos[1] > this.dimY) {
      asteroid.pos[1] -= this.dimY;
    } else if (asteroid.pos[1] < 0) {
      asteroid.pos[1] += this.dimY;
    }
  });
};

Game.prototype.checkCollisions = function () {
  // asteroids.forEach ((asteroid) => {
  for(let j = 0; j < this.allObjects().length - 1; j++) {
    for(let i = j + 1; i < this.allObjects().length; i++) {
      this.allObjects()[j].collideWith(this.allObjects()[i]);
      // if (asteroids[j].isCollidedWith(asteroids[i])) {
      //   alert("COLLISION");
      //   break;
      // }
    }
  }
};

Game.prototype.step = function () {
  // debugger
  this.checkCollisions();
  this.moveObjects();
};

Game.prototype.remove = function (collidedAsteroid) {
  const noncollidedAsteroids = asteroids.slice();
  noncollidedAsteroids.forEach((asteroid) => {
    if (asteroid !== collidedAsteroid) {
      asteroids.push(asteroid);
    }
    asteroids.shift();
  });
};

window.Game = Game;

module.exports = Game;
