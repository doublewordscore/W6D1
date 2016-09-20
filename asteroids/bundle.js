/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);
	
	const canvas = document.getElementById("game-canvas");
	const ctx = canvas.getContext("2d");
	
	const gameView = new GameView(ctx);
	
	gameView.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);
	
	const GameView = function(ctx) {
	  this.game = new Game();
	  this.ctx = ctx;
	};
	
	GameView.prototype.start = function () {
	  setInterval(function() {
	    this.game.step();
	    this.game.draw(this.ctx);
	  }.bind(this), 20);
	};
	
	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	const Ship = __webpack_require__(6);
	
	const Asteroid = function (options) {
	  MovingObject.call(this, options);
	  this.vel = Util.randomVec(2);
	  this.color = Asteroid.COLOR;
	  this.radius = Asteroid.RADIUS;
	};
	
	Asteroid.RADIUS = 10;
	Asteroid.COLOR = "#78281F";
	
	Util.inherits(Asteroid, MovingObject);
	
	Asteroid.prototype.collideWith = function (otherObject) {
	  if (otherObject instanceof Ship) {
	    otherObject.relocate();
	  }
	  //
	  // if (this.isCollidedWith(otherObject)) {
	  //   this.game.remove(otherObject);
	  //   this.game.remove(this);
	  // }
	};
	
	// window.Asteroid = Asteroid;
	
	module.exports = Asteroid;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits: function(childClass, parentClass) {
	    const Surrogate = function () {};
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate ();
	    childClass.prototype.constructor = childClass;
	  },
	
	  randomVec: function (length) {
	    const x_vec = ((Math.random() * 2) - 1) * length;
	    const y_vec = ((Math.random() * 2) - 1) * length;
	
	    return [x_vec, y_vec];
	  }
	};
	
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const MovingObject = function (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	};
	
	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	
	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );
	
	  ctx.fill();
	};
	
	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  debugger
	  this.game.wrap(this.pos);
	};
	
	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  const deltaX = Math.pow(this.pos[0] - otherObject.pos[0], 2);
	  const deltaY = Math.pow(this.pos[1] - otherObject.pos[1], 2);
	  const distanceBetween = Math.sqrt(deltaX + deltaY);
	  if (distanceBetween < (this.radius + otherObject.radius)) {
	    return true;
	  } else {
	    return false;
	  }
	};
	
	MovingObject.prototype.collideWith = function (otherObject) {
	  // if (this.isCollidedWith(otherObject)) {
	  //   this.game.remove(otherObject);
	  //   this.game.remove(this);
	  // }
	};
	
	module.exports = MovingObject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	
	const Ship = function (options) {
	  MovingObject.call(this, options);
	  this.vel = [0, 0];
	  this.color = Ship.COLOR;
	  this.radius = Ship.RADIUS;
	};
	
	Ship.RADIUS = 10;
	Ship.COLOR = "#00cdcd";
	
	Util.inherits(Ship, MovingObject);
	
	Ship.prototype.relocate = function () {
	  this.pos = this.game.randomPosition();
	  this.vel = [0, 0];
	};
	
	module.exports = Ship;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map