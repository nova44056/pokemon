const app = document.querySelector(".app");
const canvas = app.querySelector("canvas");

const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const map = new Image();
map.src = "./img/Pellet Town.png";
const player = new Image();
const playerImageSrc = {
  up: "./img/playerUp.png",
  down: "./img/playerDown.png",
  left: "./img/playerLeft.png",
  right: "./img/playerRight.png",
};
player.src = playerImageSrc["down"];
const foreground = new Image();
foreground.src = "./img/foregroundObjects.png";

const assetsLoader = async () => {
  canvas.style.display = "none";
  return new Promise((resolve) => {
    map.onload = () => {
      player.onload = () => {
        foreground.onload = () => {
          resolve();
        };
      };
    };
  });
};

var playerMaxFrame = 4;
var currentPlayerFrame = 0;
var playerIsMoving = false;
var playerAnimationTime = 0;
var playerAnimationDelay = 5;

var mapX = -740;
var mapY = -600;

var keyPressed = null;

const playerVelocity = 5;

const animate = () => {
  window.requestAnimationFrame(animate);
  ctx.drawImage(map, mapX, mapY);
  ctx.drawImage(
    player,
    0 + (player.width / 4) * currentPlayerFrame,
    0,
    player.width / 4,
    player.height,
    CANVAS_WIDTH / 2 - player.width / 8,
    CANVAS_HEIGHT / 2 - player.height / 2,
    player.width / 4,
    player.height
  );
  ctx.drawImage(foreground, mapX, mapY);

  if (playerIsMoving) {
    playerAnimationTime++;
    switch (keyPressed) {
      case "ArrowUp":
        mapY += playerVelocity;
        if (playerAnimationTime === 1)
          currentPlayerFrame = ++currentPlayerFrame % playerMaxFrame;
        else if (playerAnimationTime % playerAnimationDelay === 0)
          currentPlayerFrame = ++currentPlayerFrame % playerMaxFrame;
        break;
      case "ArrowDown":
        mapY -= playerVelocity;
        if (playerAnimationTime === 1)
          currentPlayerFrame = ++currentPlayerFrame % playerMaxFrame;
        else if (playerAnimationTime % playerAnimationDelay === 0)
          currentPlayerFrame = ++currentPlayerFrame % playerMaxFrame;
        break;
      case "ArrowLeft":
        mapX += playerVelocity;
        if (playerAnimationTime === 1)
          currentPlayerFrame = ++currentPlayerFrame % playerMaxFrame;
        else if (playerAnimationTime % playerAnimationDelay === 0)
          currentPlayerFrame = ++currentPlayerFrame % playerMaxFrame;
        break;
      case "ArrowRight":
        mapX -= playerVelocity;
        if (playerAnimationTime === 1)
          currentPlayerFrame = ++currentPlayerFrame % playerMaxFrame;
        else if (playerAnimationTime % playerAnimationDelay === 0)
          currentPlayerFrame = ++currentPlayerFrame % playerMaxFrame;
        break;
    }
  }
};

assetsLoader().then(() => {
  canvas.style.display = "block";
  window.addEventListener("keydown", (e) => {
    keyPressed = e.key;
    switch (e.key) {
      case "ArrowUp":
        player.src = playerImageSrc["up"];
        playerIsMoving = true;
        break;
      case "ArrowDown":
        player.src = playerImageSrc["down"];
        playerIsMoving = true;
        break;
      case "ArrowLeft":
        player.src = playerImageSrc["left"];
        playerIsMoving = true;
        break;
      case "ArrowRight":
        player.src = playerImageSrc["right"];
        playerIsMoving = true;
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    keyPressed = null;
    playerIsMoving = false;
    currentPlayerFrame = 0;
    playerAnimationTime = 0;
  });

  animate();
});

// animate();

// window.addEventListener("keydown", (e) => {
//   switch (e.key) {
//     case "ArrowUp":
//       console.log("up");
//       break;
//     case "ArrowDown":
//       animate();
//       break;
//     case "ArrowLeft":
//       console.log("left");
//       break;
//     case "ArrowRight":
//       console("right");
//       break;
//   }
// });
