import kaboom from "kaboom";

const k = kaboom({ scale: 4 });

k.loadSprite("player", "sprites/player.png", {
  sliceX: 9,
  sliceY: 6,
  anims: {
    idle: {
      from: 0,
      to: 0,
      loop: false,
    },
    walk_x: {
      from: 3,
      to: 5,
      loop: true,
    },
    up: {
      from: 6,
      to: 8,
      loop: true,
    },
    down: {
      from: 1,
      to: 2,
      loop: true,
    },
  },
});

k.loadSprite("tilemap", "sprites/tilemap.png", {
  sliceX: 4,
  sliceY: 4,
});

const SPEED = 120;

const level = k.addLevel([
  "###########",
  "###########",
  "#    $    ",
], {
  tileWidth: 45,
  tileHeight: 45,
  pos: k.center(),
  tiles: {
    "$": () => [
      k.sprite("player"),
      k.pos(k.center()),
      k.anchor("center"),
      k.area(),
      k.body(),
      "player",
    ],
    "#": () => [k.sprite("tilemap", { frame: 5 })],
    "%": () => [k.sprite("tilemap", { frame: 3 })],
  },
});

const player = level.get("player")[0];

player.onUpdate(() => {
  k.camPos(player.worldPos());
});

k.onKeyDown("left", () => {
  player.move(-SPEED, 0);
  player.flipX = true;
  if (player.curAnim() !== "walk_x") {
    player.play("walk_x");
  }
});

k.onKeyDown("right", () => {
  player.move(SPEED, 0);
  player.flipX = false;
  if (player.curAnim() !== "walk_x") {
    player.play("walk_x");
  }
});

k.onKeyDown("up", () => {
  player.move(0, -SPEED);
  if (player.curAnim() !== "up") {
    player.play("up");
  }
});

k.onKeyDown("down", () => {
  player.move(0, SPEED);
  if (player.curAnim() !== "down") {
    player.play("down");
  }
});

["left", "right", "up", "down"].forEach((key) => {
  k.onKeyRelease(key, () => {
    if (
      !k.isKeyDown("left") &&
      !k.isKeyDown("right") &&
      !k.isKeyDown("up") &&
      !k.isKeyDown("down")
    ) {
      player.play("idle");
    }
  });
});
