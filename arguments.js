const sumArguments = function () {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }

  return result;
};

// console.log(sumArguments(1,2,3,4));

const sumRest = function (...args) {
  let result = 0;
  for (let i = 0; i < args.length; i++) {
    result += args[i];
  }

  return result;
};

// console.log(sumArguments(1,2,3,4));

Function.prototype.myBind = function (context) {
  let func = this;
  const boundArgs = Array.from(arguments).slice(1);

  return function () {
    const newArgs = boundArgs.concat(Array.from(arguments));
    func.apply(context, newArgs);
    return true;
  };
};

Function.prototype.myBind2 = function (context, ...args) {
  let func = this;

  return function (...newArgs) {
    const allArgs = args.concat(newArgs);
    func.apply(context, allArgs);
    return true;
  };
};

function curriedSum (numArgs) {
  const numbers = [];

  return function _curriedSum (num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      let sum = 0;
      numbers.forEach((el) => { sum += el; });
      return sum;
    } else {
      return _curriedSum;
    }
  };
}


Function.prototype.curryApply = function (numArgs) {
  const func = this;
  const args = [];

  return function _curry (arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return func.apply(null, args);
    } else {
      return _curry;
    }
  };
};

Function.prototype.curryRest = function (numArgs) {
  const func = this;
  const args = [];

  return function _curry (arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return func.call(null, ...args);
    } else {
      return _curry;
    }
  };
};


function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
let f1 = sumThree.curryRest(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

// or more briefly:
console.log(sumThree.curryRest(3)(4)(20)(6)); // == 30
