import kaplay from "kaplay";
import "kaplay/global";

const k = kaplay();

k.scene("game", () => {
  k.loadSpriteAtlas("sprites/Tileset/Tileset.png", {
    grass: {
      x: 0,
      y: 0,
      width: 16,
      height: 16,
    },
  });

  k.loadSprite("player", "sprites/Characters/Character 1.png", {
    sliceX: 4,
    sliceY: 4,
    anims: {
      idle: { from: 0, to: 0 },
      left: { from: 8, to: 11, speed: 7, loop: true },
      right: { from: 12, to: 15, speed: 7, loop: true },
      up: { from: 5, to: 7, speed: 7, loop: true },
      down: { from: 1, to: 3, speed: 7, loop: true },
    },
  });

  k.loadSprite(
    "programon",
    "sprites/Monsters/New Versions/zoonami_burrlock_front.png"
  );

  const SPEED = 320;

  const level = k.addLevel(
    [
      "     ^     ",
      "           ",
      "           ",
      "           ",
      "===========",
      "===========",
      "===========",
      "===========",
      "===========",
      "===========",
      "===========",
      "===========",
      "===========",
      "===========",
      "           ",
      "           ",
      "           ",
      "     @     ",
    ],
    {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        "@": () => [
          k.sprite("player"),
          k.area(),
          k.anchor("center"),
          k.scale(4),
          "player",
        ],
        "=": () => [k.sprite("grass")],
        "^": () => [
          k.sprite("programon"),
          k.area(),
          k.anchor("center"),
          k.scale(2),
          "programon",
        ],
      },
    }
  );

  const player = level.get("player")[0];

  player.play("idle");

  player.onUpdate(() => {
    k.camPos(player.worldPos());
  });

  k.onKeyDown("left", () => {
    player.move(-SPEED, 0);
    if (!player.getCurAnim("left")) {
      player.play("left");
    }
  });

  k.onKeyDown("right", () => {
    player.move(SPEED, 0);
    if (!player.getCurAnim("right")) {
      player.play("right");
    }
  });

  k.onKeyDown("up", () => {
    player.move(0, -SPEED);
    if (!player.getCurAnim("up")) {
      player.play("up");
    }
  });

  k.onKeyDown("down", () => {
    player.move(0, SPEED);
    if (!player.getCurAnim("down")) {
      player.play("down");
    }
  });

  ["left", "right", "up", "down"].forEach((key) => {
    k.onKeyRelease(key, () => {
      if (
        !isKeyDown("left") &&
        !isKeyDown("right") &&
        !isKeyDown("up") &&
        !isKeyDown("down")
      ) {
        player.play("idle");
      }
    });
  });

  player.onCollide("programon", () => {
    k.go("battle");
  });
});

k.go("game");

k.scene("battle", () => {
  k.debug.log("Batalha iniciada!");
});
