const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const map = new Image();
map.src = "./img/Pellet Town.png";

const playerUp = new Image();
playerUp.src = "./img/playerUp.png";

const playerDown = new Image();
playerDown.src = "./img/playerDown.png";

const playerLeft = new Image();
playerLeft.src = "./img/playerLeft.png";

const playerRight = new Image();
playerRight.src = "./img/playerRight.png";

const foreground = new Image();
foreground.src = "./img/foregroundObjects.png";

var player = new Image();

const assetsLoader = async () => {
  return new Promise((resolve) => {
    map.onload = () => resolve(map);
    playerUp.onload = () => resolve(playerUp);
    playerDown.onload = () => resolve(playerDown);
    playerLeft.onload = () => resolve(playerLeft);
    playerRight.onload = () => resolve(playerRight);
    foreground.onload = () => resolve(foreground);
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

async function run() {
  const welcome = document.querySelector(".welcome");
  welcome.classList.add("close");

  assetsLoader();
  // default
  player = playerDown;

  document.body.append(canvas);
  window.addEventListener("keydown", (e) => {
    keyPressed = e.key;
    switch (e.key) {
      case "ArrowUp":
        player = playerUp;
        playerIsMoving = true;
        break;
      case "ArrowDown":
        player = playerDown;
        playerIsMoving = true;
        break;
      case "ArrowLeft":
        player = playerLeft;
        playerIsMoving = true;
        break;
      case "ArrowRight":
        player = playerRight;
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
}
