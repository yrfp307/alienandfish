var speed;
var my_5;

function math_random_int(a, b) {
  if (a > b) {
    // Swap a and b to ensure a is smaller.
    var c = a;
    a = b;
    b = c;
  }
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function wandering(this_sprite) {
  if (math_random_int(0, 5) == 0) {
    changePropBy(this_sprite, "direction", math_random_int(-25, 25));
  }
  moveForward(this_sprite, 1);
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
    changePropBy(this_sprite, "direction", math_random_int(135, 225));
  }
}

function check_score() {
  showTitleScreen(['healthy fish:',[countByAnimation(({costume: "fish"})),'/10'].join('')].join(''), undefined);
  if (countByAnimation(({costume: "potion"})) == 0) {
    showTitleScreen(undefined, 'CONGRATS!!');
    setAnimation(({costume: "fish_green_1"}), "fish");
    setAnimation(({costume: "fish_brown_1"}), "fish");
  }
  if (countByAnimation(({costume: "fish_brown_1"})) >= 10) {
    showTitleScreen('GAME OVER!!', undefined);
    setTint(({costume: "orange monster"}), '#ff0000');
    destroy(({costume: "orange monster"}));
  }
}

function moving_west(this_sprite) {
  moveInDirection(this_sprite, 5, "West");
}

function spinning_right(this_sprite) {
  turn(this_sprite, 6, "right");
}

function growing(this_sprite) {
  changePropBy(this_sprite, "scale", 1);
}

function swimming_left_and_right(this_sprite) {
  if (getProp(this_sprite, "direction") == 0) {
    mirrorSprite(this_sprite, "right");
  } else if (getProp(this_sprite, "direction") == 180) {
    mirrorSprite(this_sprite, "left");
  }
  moveForward(this_sprite, 5);
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
    changePropBy(this_sprite, "direction", 180);
  }
}

function moving_east(this_sprite) {
  moveInDirection(this_sprite, 5, "East");
}

function moving_north(this_sprite) {
  moveInDirection(this_sprite, 5, "North");
}

function patrolling(this_sprite) {
  moveForward(this_sprite, 5);
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
    changePropBy(this_sprite, "direction", 180);
  }
}

function moving_south(this_sprite) {
  moveInDirection(this_sprite, 5, "South");
}

function jittering(this_sprite) {
  changePropBy(this_sprite, "scale", math_random_int(-1, 1));
}

function shrinking(this_sprite) {
  changePropBy(this_sprite, "scale", -1);
}

function spinning_left(this_sprite) {
  turn(this_sprite, 6, "left");
}

function moving_with_arrow_keys(this_sprite) {
  if (isKeyPressed("up")) {
    moveInDirection(this_sprite, 5, "North");
  }
  if (isKeyPressed("down")) {
    moveInDirection(this_sprite, 5, "South");
  }
  if (isKeyPressed("left")) {
    moveInDirection(this_sprite, 5, "West");
  }
  if (isKeyPressed("right")) {
    moveInDirection(this_sprite, 5, "East");
  }
}

function driving_with_arrow_keys(this_sprite) {
  if (isKeyPressed("up")) {
    moveForward(this_sprite, 5);
  }
  if (isKeyPressed("down")) {
    moveBackward(this_sprite, 5);
  }
  if (isKeyPressed("left")) {
    changePropBy(this_sprite, "direction", -5);
    changePropBy(this_sprite, "rotation", -5);
  }
  if (isKeyPressed("right")) {
    changePropBy(this_sprite, "direction", 5);
    changePropBy(this_sprite, "rotation", 5);
  }
  if (isTouchingEdges(this_sprite)) {
    edgesDisplace(this_sprite);
  }
}

makeNewSpriteAnon("orange monster", ({"x":304,"y":242}));
setProp(({costume: "orange monster"}), "scale", 72);
setBackgroundImage("https://studio.code.org/blockly/media/skins/studio/background_space.png");
for (var count = 0; count < 10; count++) {
  makeNewSpriteAnon("fish", randomLocation());
  setProp(({costume: "fish"}), "scale", 50);
}
for (var count2 = 0; count2 < 5; count2++) {
  makeNewSpriteAnon("potion", randomLocation());
  setProp(({costume: "potion"}), "scale", 50);
}
addBehaviorSimple(({costume: "fish"}), new Behavior(wandering, []));
speed = my_5;
check_score();

keyPressed("when", "up", function () {
  moveInDirection(({costume: "orange monster"}), 10, "North");
});

keyPressed("while", "down", function () {
  moveInDirection(({costume: "orange monster"}), 10, "South");
});

keyPressed("while", "left", function () {
  moveInDirection(({costume: "orange monster"}), 10, "West");
});

keyPressed("while", "right", function () {
  moveInDirection(({costume: "orange monster"}), 10, "East");
});

checkTouching("when", ({costume: "fish"}), ({costume: "potion"}), function (extraArgs) {
  bounceOff(({id: extraArgs.subjectSprite}), ({id: extraArgs.objectSprite}));
  setAnimation(({id: extraArgs.subjectSprite}), "fish_green_1");
  check_score();
});

checkTouching("when", ({costume: "fish_green_1"}), ({costume: "potion"}), function (extraArgs) {
  removeAllBehaviors(({id: extraArgs.subjectSprite}));
  setAnimation(({id: extraArgs.subjectSprite}), "fish_brown_1");
});

checkTouching("when", ({costume: "orange monster"}), ({costume: "potion"}), function (extraArgs) {
  destroy(({id: extraArgs.objectSprite}));
  if (speed < 15) {
    speed = speed + 1;
  }
  check_score();
});

checkTouching("when", ({costume: "orange monster"}), ({costume: "fish_green_1"}), function (extraArgs) {
  if (speed > 10) {
    speed = speed - 1;
  }
});
