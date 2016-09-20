const Util = require("./utils");
const MovingObject = require("./moving_object");

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
