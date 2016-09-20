const GameView = require("./game_view");

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const gameView = new GameView(ctx);

gameView.start();
