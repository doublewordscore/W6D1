Function.prototype.inherits = function (superClass) {
  const Surrogate = function () {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject (color) {
  this.color = color;
}

MovingObject.prototype.yell = function () {
  console.log("I am a moving object!");
};

function Ship (color, name) {
  MovingObject.call(this, color);
  this.name = name;
}

Ship.inherits(MovingObject);

function Asteroid(color, size) {
  MovingObject.call(this, color);
  this.size = size;
}

Asteroid.inherits(MovingObject);

Ship.prototype.shoot = function () {
  console.log(`${this.name} is shooting!`);
};

Asteroid.prototype.collide = function () {
  console.log(`Watch out!`);
};
