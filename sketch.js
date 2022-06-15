var globalTime = 0;
var isShooting = false;
var isOk = false;
const finomitas = 300;
var gp;
var gp2;
var gp3;
var gp4;
var walls = [];
var muds = [];
var grasses = [];
var grassColors = [];
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
  toMenuButton = new My_Button(10,10,[255,20,10],0,18,"quit to menu",[112,36])
  mainMenu = new MainMenu();
  background(220);
  //console.log("setup ended well!");
}

function draw() {
  if (inMenu) {
    mainMenu.display();
    mainMenu.previewDisplay(183,350,mainMenu.colorPicker1.color(),mainMenu.sel1.value())
    mainMenu.previewDisplay(465,350,mainMenu.colorPicker2.color(),mainMenu.sel2.value())
  } else {
    gp.clear();
    gp4.clear();
    toMenuButton.display(gp3)
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
    
    if (mouseIsPressed === true) {
      let cords = controller.pixToCord(mouseX, mouseY);
       if (mouseX < 500) {
        if (controller.getOnTurn().wantsToShoot) {
          controller.shot(cords);
        } else {
          controller.getOnTurn().plannedInput(cords);
        }
      }
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
  
  if(!inMenu){
    if(keyCode === BACKSPACE){
      controller.back()
    }
    //W
    if(keyCode === 87 || keyCode === UP_ARROW){
       controller.getOnTurn().planByDir("up")
    }
    //S
    if (keyCode == 83 || keyCode === DOWN_ARROW){
        controller.getOnTurn().planByDir("down")
        }
    //D
    if (keyCode == 68 || keyCode === RIGHT_ARROW){
        controller.getOnTurn().planByDir("right")
        }
    //A
    if (keyCode == 65 || keyCode === LEFT_ARROW){
        controller.getOnTurn().planByDir("left")
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
      toMenuButton.checker(mouseX,mouseY,toMenu)
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
    mainMenu.player1ResetButton.checker(mouseX, mouseY,mainMenu.resetP1)
    mainMenu.player2ResetButton.checker(mouseX, mouseY,mainMenu.resetP2)
  }
}

function toMenu(){
inMenu = true;
globalTime = 0;
isShooting = false;
isOk = false;
walls = [];
muds = [];
grasses = [];
grassColors = [];
mudColors = []
controller = new Controller();
createCanvas(600, 500);
gp2 = createGraphics(600, 500);
gp = createGraphics(500, 500);
gp3 = createGraphics(500, 500);
gp4 = createGraphics(500, 500);
controller = new Controller(gp, gp2);
mainMenu = new MainMenu();
background(220);
inMenu = true;
  }
