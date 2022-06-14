var globalTime = 0;
var isShooting = false;
var isOk = false;
var finomitas = 300;
var gp;
var gp2;
var gp3;
var gp4;
var walls = [];
var muds = [];
var grasses = [];
var grassColors = [];
var wallColors = [];
var mudColors = [];
var inMenu = true;
controller = new Controller();

function setup() {
  createCanvas(600, 500);
  gp2 = createGraphics(600, 500);
  gp = createGraphics(500, 500);
  gp3 = createGraphics(500, 500);
  gp4 = createGraphics(500, 500);
  controller = new Controller(gp, gp2);
  mainMenu = new MainMenu();
  background(220);
  //console.log("setup ended well!");
}

function draw() {
  if (inMenu) {
    mainMenu.display();
  } else {
    gp.clear();
    gp4.clear();
    controller.display();
    image(gp2, 0, 0);
    image(gp, 0, 0);
    image(gp3, 0, 0);
    image(gp4, 0, 0);
    globalTime++;
    if (globalTime == 300) {
      globalTime = 0;
    }

    if (isOk == true) {
      controller.endTurn();
    } else {
      //console.log(controller.getOnTurn().plannedMoves)
    }
  }
}

function keyPressed() {
  if (!isShooting) {
    if (keyCode === ENTER) {
      if (inMenu) {
        mainMenu.apply();
      } else {
        controller.endTurn();
      }
    }

    if (keyCode === ESCAPE) {
      if (!inMenu) {
        controller.restart();
      } else {
        mainMenu.reset();
      }
    }
  }
}

function mousePressed() {
  if (!inMenu) {
    if (!isShooting) {
      //controller.endTurn()
      //controller.getNotOnTurn().health -= 10
      //console.log( controller.getNotOnTurn().health)
      let cords = controller.pixToCord(mouseX, mouseY);
      //buttons
      controller.okButton.checker(mouseX, mouseY, controller.setOk);
      controller.shootButton.checker(mouseX, mouseY, controller.setShooting);
      controller.resetButton.checker(
        mouseX,
        mouseY,
        controller.resetPlayerMoves
      );

      controller.restartButton.checker(mouseX, mouseY, controller.restart);
      controller.backButton.checker(mouseX, mouseY, controller.back);
      //input to player
      if (mouseX < 500) {
        if (controller.getOnTurn().wantsToShoot) {
          controller.shot(cords);
        } else {
          controller.getOnTurn().plannedInput(cords);
        }
      }
    }
  } else {
    mainMenu.applyButton.checker(mouseX, mouseY, mainMenu.apply);
  }
}
