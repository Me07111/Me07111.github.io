class Controller {
  constructor(pGp,pGp2) {
    this.player1 = new Player("yellow", 3, 25, [245, 237, 15], 100, true, 7);
    this.player2 = new Player("red", 47, 25, [247, 5, 5], 100, false, 7);
    this.okButton = new My_Button(500, 0, 220, [5, 239, 50], 24, "End Turn", [
      100,
      32,
    ]);
    this.shootButton = new My_Button(500, 32, 220, [240, 12, 12], 30, "Shoot", [
      100,
      32,
    ]);
    this.resetButton = new My_Button(
      500,
      64,
      220,
      [240, 50, 141],
      30,
      "Reset",
      [100, 32]
    );

    this.backButton = new My_Button(500, 96, 220, [240, 150, 14], 30, "Back", [
      100,
      32,
    ]);
    
     this.restartButton = new My_Button(
      500,
      128,
      220,
      [0,0,0],
      30,
      "Restart",
      [100, 32]
    );

    this.playerHealthBar = new uiBar(
      505,
      390,
      this.getOnTurn().health,
      100,
      30,
      "Health",
      90,
      32,
      this.getOnTurn().color,
      10,
      2
    );

    this.enemyHealthBar = new uiBar(
      505,
      240,
      this.getNotOnTurn().health,
      100,
      20,
      this.getNotOnTurn().name + "\n health",
      90,
      32,
      this.getOnTurn().color,
      35,
      14
    );

    var gameState = [];
    this.graphics = pGp;
    this.gp2 = pGp2
    this.genMud = true;
    this.player1shape = "rectangle";
    this.player2shape = "rectangle";
  }

  pixToCord(x, y) {
    let a = (x - (x % 10)) / 10;
    let b = (y - (y % 10)) / 10;
    return [a, b];
  }

  pixToCord1(x) {
    let a = (x - (x % 10)) / 10;
    return a;
  }

  cordToPix(a) {
    let x = a * 10 + 5;
    return x;
  }

  display() {
    this.player1.display(this.player1shape);
    this.player2.display(this.player2shape);
    this.okButton.display();
    this.shootButton.display();
    this.resetButton.display();
    this.restartButton.display();
    this.playerHealthBar.display();
    this.playerHealthBar.value = this.getOnTurn().health;
    this.playerHealthBar.color = this.getOnTurn().color;
    this.enemyHealthBar.display();
    this.enemyHealthBar.value = this.getNotOnTurn().health;
    this.enemyHealthBar.color = this.getNotOnTurn().color;
    this.enemyHealthBar.name = this.getNotOnTurn().name + "\n health";
    this.actionPointsDisplay();
    this.backButton.display();
    this.onTurnDisplay();
    if (this.getOnTurn().wantsToShoot == true) {
      this.ShootUIDisplay();
    }
    if (isShooting == true) {
      this.bulletDisplay(globalTime);
    }
  }

  gameBoardDisplay() {
    walls = [];
    let rand;
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        rand = round(random(1, 25))
        if (rand == 1) {
          walls.push([i, j]);
          this.randomWall(i, j);
        } else if (rand == 2) {
          if(this.genMud)
          {
            muds.push([i,j])
          }
          else{
            this.fieldDisplay(i, j, 0);
          }
        } else{
          this.fieldDisplay(i, j, 0);
        }
      }
    }
    this.displayMuds();
    this.displayWalls();
  }

  gameBoardDisplayWithNoWalls() {
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        this.fieldDisplay(i, j, 0);
      }
    }
  }

  setOk() {
    isOk = true;
    console.log(isOk);
  }

  setShooting() {
    controller.getOnTurn().wantsToShoot = !controller.getOnTurn().wantsToShoot;
    console.log(isShooting);
  }

  endTurn() {
    isOk = false;
    isShooting = false;
    this.player1.onTurn = !this.player1.onTurn;
    this.player2.onTurn = !this.player2.onTurn;
    console.log("todo endturn");
  }

  bulletDisplay() {
    console.log("bullet display todo");
  }

  fieldDisplay(x, y, type) {
    x = x * 10;
    y = y * 10;
    switch (type) {
      //grass
      case 0:
        let grassColor = round(random(100,180))
        gp2.push();
        gp2.fill(0, grassColor, 0);
        gp2.strokeWeight(0.5);
        gp2.rect(x, y, 10);
        gp2.push();
        break;
      //wall
      case 1:
        let wallColor = round(random(90,150))
        gp2.push();
        gp2.fill(wallColor);
        gp2.strokeWeight(0.5);
        gp2.rect(x, y, 10);
        gp2.push();
        break;
      //players planned move
      case 2:
        gp2.push();
        gp2.fill(0, 0, 255, 90);
        gp2.strokeWeight(0.5);
        gp2.rect(x, y, 10);
        gp2.push();
        break;
        //mud
        case 3:
        let mudColor = round(random(30,70))
        gp2.push();
        gp2.fill(mudColor, 13, 13, 200);
        gp2.strokeWeight(0.5);
        gp2.rect(x, y, 10);
        gp2.push();
        break;
      default:
        console.log("something is wrong in controller.fieldDisplay");
        break;
    }
  }

  getOnTurn() {
    if (this.player1.onTurn) {
      return this.player1;
    } else {
      return this.player2;
    }
  }

  getNotOnTurn() {
    if (!this.player1.onTurn) {
      return this.player1;
    } else {
      return this.player2;
    }
  }

  ShootUIDisplay() {
    let targetArray = [mouseX, mouseY];
    let playerPosArray = [
      this.cordToPix(controller.getOnTurn().ghostX),
      this.cordToPix(controller.getOnTurn().ghostY),
    ];
    gp.push();
    gp.stroke(controller.getOnTurn().color);
    gp.line(
      playerPosArray[0],
      playerPosArray[1],
      targetArray[0],
      targetArray[1]
    );
    let distance = dist(
      controller.getOnTurn().ghostX,
      controller.getOnTurn().ghostY,
      controller.pixToCord1(targetArray[0]),
      controller.pixToCord1(targetArray[1])
    );
    let minusPoints;
    if (round(distance / 3.5, 0) < 8) {
      minusPoints = round(distance / 3.5, 0);
    } else {
      minusPoints = "NO";
    }
    gp.pop();
    gp.textSize(20);
    gp.fill(this.getOnTurn().color);
    gp.text(minusPoints, playerPosArray[0] - 13, playerPosArray[1] - 15);
    gp.push();
  }

  shot(cords) {
    this.getOnTurn().plannedInput(cords);
    this.getOnTurn().wantsToShoot = false;
  }

  resetPlayerMoves() {
    let player = controller.getOnTurn();
    player.plannedMoves = [];
    player.actionPoints = 7;
    player.ghostX = player.x;
    player.ghostY = player.y;
    controller.gameBoardDisplayWithNoWalls();
    let wall;
    console.log(walls.length)
    controller.displayMuds();
    controller.displayWalls()
  }

  onTurnDisplay() {
    gp2.push();
    gp2.noStroke();
    gp2.fill(220);
    gp2.rect(505, 450, 100, 35);
    gp2.pop();
    gp2.push();
    gp2.stroke(0);
    gp2.strokeWeight(1);
    gp2.fill(0);
    gp2.textSize(30);
    gp2.text("on turn:", 507, 450);
    gp2.textSize(20);
    gp2.fill(this.getOnTurn().color);
    gp2.text(this.getOnTurn().name, 505, 480);
    gp2.pop();
  }

  actionPointsDisplay() {
    gp2.push();
    gp2.noStroke();
    gp2.fill(220);
    gp2.rect(505, 320, 100, 35);
    gp2.pop();
    gp2.push();
    gp2.fill(0);
    gp2.textSize(20);
    gp2.text("action", 503, 300);
    gp2.text("points :", 520, 320);
    gp2.textSize(30);
    gp2.fill(this.getOnTurn().color);
    gp2.text(this.getOnTurn().actionPoints, 537, 353);
    gp2.pop();
  }
  
  back(){
    console.log("back is broken")
    /*let player = controller.getOnTurn()
    if(player.plannedMoves.length > 0)
 {    let removed = player.plannedMoves.pop();
      controller.gameBoardDisplayWithNoWalls();
      controller.displayWalls();
      controller.displayAllPlannedMoves();
      let movesReverse = player.plannedMoves.reverse();
      //let lastMove = [player.x,player.y]
  let lastMove = movesReverse.find(controller.isMove)
  console.log(movesReverse.find(controller.isMove))

    console.log(player.plannedMoves)
    player.ghostX = lastMove[0]
    player.ghostY = lastMove[1]   
    player.actionPoints += player.lastMinus;
 } */
  } 

  isMove(x) {
    if(x[2] == 0){
      return true
    }
    else{
      return false
    }
  }

  randomWall(x, y) {
    let type = round(random(0, 3.48));
    let xPlus;
    let yPlus;
    var wallLength;
    switch (type) {
      case 0:
        xPlus = 0;
        yPlus = -1;
        wallLength = random(1, 5);
        for (let i = 0; i < wallLength; i++) {
          x += xPlus;
          y += yPlus;
          walls.push([x, y]);
        }
        break;

      case 1:
        xPlus = 0;
        yPlus = 1;
        wallLength = random(1, 5);
        for (let i = 0; i < wallLength; i++) {
          x += xPlus;
          y += yPlus;
          walls.push([x, y]);
          }
        break;

      case 2:
        xPlus = -1;
        yPlus = -1;
        wallLength = random(1, 5);
        for (let i = 0; i < wallLength; i++) {
          x += xPlus;
          y += yPlus;
          walls.push([x, y]);
        }
        break;

      case 3:
        xPlus = -1;
        yPlus = 1;
        wallLength = random(1, 5);
        for (let i = 0; i < wallLength; i++) {
          x += xPlus;
          y += yPlus;
          walls.push([x, y]);
        }
        break;
      default:
        console.log("something is wrong");
        break;
    }
  }

  isMud(x) {
    let ret;
    let mud;
    for (let i = 0; i < muds.length; i++) {
      mud = muds[i];
      if (x[0] == mud[0] && x[1] == mud[1]) {
        ret = true;
      }
    }
    if (ret) {
      return true;
    } else {
      return false;
    }
  }
  
   isWall(x) {
    let ret;
    let wall;
    for (let i = 0; i < walls.length; i++) {
      wall = walls[i];
      if (x[0] == wall[0] && x[1] == wall[1]) {
        ret = true;
      }
    }
    if (ret) {
      return true;
    } else {
      return false;
    }
  }
  
  displayWalls(){
    let wall;
    for(let i = 0;i < walls.length;i++){
     wall = walls[i]
      controller.fieldDisplay(wall[0],wall[1],1)
    }
  }
  
  restart(){
    //reset player properties
    controller.player1.x = 3;
    controller.player2.x = 47;
    controller.player1.y = 25;
    controller.player2.y = 25;
    controller.player1.plannedMoves = [];
    controller.player1.actionPoints = 7;
    controller.player1.ghostX = controller.player1.x;
    controller.player1.ghostY = controller.player1.y;
    controller.player2.plannedMoves = [];
    controller.player2.actionPoints = 7;
    controller.player2.ghostX = controller.player2.x;
    controller.player2.ghostY = controller.player2.y;
    controller.player1.health = 100;
    controller.player2.health = 100;
    controller.player1.onTurn = true;
    controller.player2.onTurn = false
    
    //resetting game properties

    globalTime = 0;
    isShooting = false;
    isOk = false;
    finomitas = 300;
    walls = [];
    muds = [];
    
    //redrawing board
    controller.gameBoardDisplay();
    
  }
  
  displayPlannedMove(x){
    if(x[2] == 0){
      this.fieldDisplay(x[0],x[1],2)
    } else if(x[2] == 1){
      let playerPosArray = [this.cordToPix(this.getOnTurn().ghostX), this.cordToPix(this.getOnTurn().ghostY)]
      console.log(playerPosArray)
        gp2.push();
        gp2.strokeWeight(3);
        gp2.stroke(0, 0, 255,75);
        gp2.line(playerPosArray[0],
        playerPosArray[1],
        this.cordToPix(x[0]),
        this.cordToPix(x[1]));
        gp2.pop();
    } else { console.log("shit, somethings wrong in controller displayPlannedMove")}
  }
  
  displayAllPlannedMoves(){
    let moves = this.getOnTurn().plannedMoves;
    for(let i = 0;i < moves.length; i++){
      this.displayPlannedMove(moves[i])
      console.log(this.getOnTurn().plannedMoves)
    }
  }
  
  displayMuds(){
     let mud;
    for(let i = 0;i < muds.length;i++){
     mud = muds[i]
      controller.fieldDisplay(mud[0],mud[1],3)
    }
  }
}