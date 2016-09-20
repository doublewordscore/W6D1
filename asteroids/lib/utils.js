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
