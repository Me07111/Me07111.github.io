class Controller {
  constructor(pGp, pGp2) {
    this.player1 = new Player("yellow", 40, 25, [245, 237, 15], 100, true, 7);
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
      [0, 0, 0],
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
    this.gp2 = pGp2;
    this.genMud = true;
    this.player1shape = "rectangle";
    this.player2shape = "rectangle";
    this.targetPos = [];
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

  cordToPixAcc(a) {
    let x = a * 10;
    return x;
  }

  display() {
    this.player1.display(this.player1shape);
    this.player2.display(this.player2shape);
    this.okButton.display(gp2);
    this.shootButton.display(gp2);
    this.resetButton.display(gp2);
    this.restartButton.display(gp2);
    if (!isShooting) {
      this.playerHealthBar.display();
      this.playerHealthBar.value = this.getOnTurn().health;
      this.playerHealthBar.color = this.getOnTurn().color;
      this.enemyHealthBar.display();
    }
    this.enemyHealthBar.value = this.getNotOnTurn().health;
    this.enemyHealthBar.color = this.getNotOnTurn().color;
    this.enemyHealthBar.name = this.getNotOnTurn().name + "\n health";
    this.actionPointsDisplay();
    this.backButton.display(gp2);
    this.onTurnDisplay();
    if (this.getOnTurn().wantsToShoot == true) {
      this.ShootUIDisplay();
    }
    if (isShooting == true) {
      this.bulletDisplay(this.targetPos);
    }
  }

  gameBoardDisplay() {
    walls = [];
    grasses = [];
    muds = [];
    grassColors = [];
    let rand;
    let onP1;
    let onP2;
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        rand = round(random(1, 20));
        if (rand == 1) {
          onP1 = i == 3 && j == 25;
          onP2 = i == 47 && j == 25;
          if (!onP1 && !onP2) {
            walls.push([i, j]);
            this.fieldDisplay(i, j, 1);
            this.randomWall(i, j);
          }
        } else if (rand == 3) {
          if (this.genMud) {
            muds.push([i, j]);
            this.fieldDisplay(i, j, 3);
          } else {
            this.fieldDisplay(i, j, 0);
            grasses.push([i, j]);
          }
        } else {
          this.fieldDisplay(i, j, 0);
          grasses.push([i, j]);
        }
      }
    }
    this.displayMuds();
    this.displayWalls();
  }

  gameBoardDisplayWithNoWalls() {
    let grass;
    let grassColor;
    for (let i = 0; i < grasses.length; i++) {
      grass = grasses[i];
      grassColor = grassColors[i];
      gp2.push();
      gp2.fill(0, grassColor, 0);
      gp2.strokeWeight(0.5);
      gp2.rect(this.cordToPixAcc(grass[0]), this.cordToPixAcc(grass[1]), 10);
      gp2.pop();
    }
  }

  setOk() {
    isOk = true;
  }

  setShooting() {
    controller.getOnTurn().wantsToShoot = !controller.getOnTurn().wantsToShoot;
  }

  endTurn() {
    isOk = false;
    let player = this.getOnTurn();
    this.gameBoardDisplayWithNoWalls();
    this.displayMuds();
    this.executePlan(this.getOnTurn().plannedMoves);
  }

  bulletDisplay(targetCords) {
    let player = this.getOnTurn();
    let targetX = this.cordToPix(targetCords[0]);
    let targetY = this.cordToPix(targetCords[1]);
    let startX = this.cordToPix(player.x);
    let startY = this.cordToPix(player.y);
    let start = createVector(startX, startY);
    let target = createVector(targetX, targetY);
    let pos = p5.Vector.lerp(start, target, globalTime / 100);
    gp.circle(pos.x, pos.y, 5);
    if (globalTime == 100) {
      isShooting = false;
      if (player.plannedMoves === []) {
        this.player1.onTurn = !this.player1.onTurn;
        this.player2.onTurn = !this.player2.onTurn;
        this.player1.actionPoints = 7;
        this.player2.actionPoints = 7;
        this.player1.plannedMoves = [];
        this.player2.plannedMoves = [];
        this.player1.ghostX = this.player1.x
        this.player2.ghostX = this.player2.x
        this.player1.ghostY = this.player1.y
        this.player2.ghostY = this.player2.y
      } else {
        this.executePlan(player.plannedMoves);
      }
    }
  }

  fieldDisplay(x, y, type) {
    x = x * 10;
    y = y * 10;
    switch (type) {
      //grass
      case 0:
        let grassColor = round(random(100, 180));
        grassColors.push(grassColor);
        gp2.push();
        gp2.fill(0, grassColor, 0);
        gp2.strokeWeight(0.5);
        gp2.rect(x, y, 10);
        gp2.pop();
        break;
      //wall
      case 1:
        let wallColor = round(random(135, 150));
        gp3.push();
        gp3.fill(wallColor);
        gp3.strokeWeight(0.5);
        gp3.rect(x, y, 10);
        gp3.pop();
        break;
      //players planned move
      case 2:
        gp2.push();
        gp2.fill(0, 0, 255, 90);
        gp2.strokeWeight(0.5);
        gp2.rect(x, y, 10);
        gp2.pop();
        break;
      //mud
      case 3:
        let mudColor = round(random(30, 70));
        mudColors.push(mudColor);
        gp2.push();
        gp2.fill(mudColor, 13, 13, 200);
        gp2.strokeWeight(0.5);
        gp2.rect(x, y, 10);
        gp2.pop();
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
    let player = controller.getOnTurn();
    let playerPosArray = [
      this.cordToPix(player.ghostX),
      this.cordToPix(player.ghostY),
    ];
    let targetArray = this.doesHitWall(
      [player.ghostX, player.ghostY],
      [this.pixToCord1(mouseX), this.pixToCord1(mouseY)],
      200,
      false
    );
    let targetPixArray = [
      this.cordToPix(targetArray[0]),
      this.cordToPix(targetArray[1]),
    ];
    gp.push();
    gp.stroke(controller.getOnTurn().color);
    gp.line(
      playerPosArray[0],
      playerPosArray[1],
      targetPixArray[0],
      targetPixArray[1]
    );
    let distance = dist(
      player.ghostX,
      player.ghostY,
      targetArray[0],
      targetArray[1]
    );
    let minusPoints;
    if (round(distance / 3.5, 0) < 8) {
      minusPoints = round(distance / 3.5, 0);
    } else {
      minusPoints = "NO";
    }
    gp4.push();
    gp4.textSize(20);
    gp4.fill(this.getOnTurn().color);
    gp4.text(minusPoints, playerPosArray[0] - 13, playerPosArray[1] - 15);
    gp4.pop();
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
    controller.displayMuds()
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

 back() {
   let lastMove;
    let player = controller.getOnTurn()
    if(player.plannedMoves.length > 0)
 {    
   let removed = player.plannedMoves.pop();
      controller.gameBoardDisplayWithNoWalls();
   controller.displayMuds();
      controller.displayAllPlannedMoves();
   if(player.plannedMoves.length!= 0)
      { 
      let movesReverse = player.plannedMoves.slice().reverse();
      lastMove = movesReverse.find(controller.isMove)
      } else{
        lastMove = [player.x,player.y]
      }
   
    player.ghostX = lastMove[0]
    player.ghostY = lastMove[1]   
    player.actionPoints += player.lastMinuses.pop();
 } 
  }

  isMove(x) {
    if (x[2] == 0) {
      return true;
    } else {
      return false;
    }
  }

  randomWall(x, y) {
    let type = round(random(0, 3.48));
    let xPlus;
    let yPlus;
    var wallLength;
    let onP1;
    let onP2;
    switch (type) {
      case 0:
        xPlus = 0;
        yPlus = -1;
        wallLength = random(1, 5);
        for (let i = 0; i < wallLength; i++) {
          x += xPlus;
          y += yPlus;
          onP1 = x == 3 && y == 25;
          onP2 = x == 47 && y == 25;
          if (onP1 && onP2) {
            walls.push([x, y]);
            this.fieldDisplay(x, y, 1);
          }
        }
        break;

      case 1:
        xPlus = 0;
        yPlus = 1;
        wallLength = random(1, 5);
        for (let i = 0; i < wallLength; i++) {
          x += xPlus;
          y += yPlus;
          onP1 = x == 3 && y == 25;
          onP2 = x == 47 && y == 25;
          if (onP1 && onP2) {
            walls.push([x, y]);
            this.fieldDisplay(x, y, 1);
          }
        }
        break;

      case 2:
        xPlus = -1;
        yPlus = -1;
        wallLength = random(1, 5);
        for (let i = 0; i < wallLength; i++) {
          x += xPlus;
          y += yPlus;
          onP1 = x == 3 && y == 25;
          onP2 = x == 47 && y == 25;
          if (!onP1 && !onP2) {
            walls.push([x, y]);
            this.fieldDisplay(x, y, 1);
          }
        }

        break;

      case 3:
        xPlus = -1;
        yPlus = 1;
        wallLength = random(1, 5);
        for (let i = 0; i < wallLength; i++) {
          x += xPlus;
          y += yPlus;
          onP1 = x == 3 && y == 25;
          onP2 = x == 47 && y == 25;
          if (!onP1 && !onP2) {
            walls.push([x, y]);
            this.fieldDisplay(x, y, 1);
          }
        }
        break;
      default:
        console.log("something is wrong in randomWall");
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
        break;
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
        break;
      }
    }
    if (ret) {
      return true;
    } else {
      return false;
    }
  }

  displayWalls() {
    let wall;
    for (let i = 0; i < walls.length; i++) {
      wall = walls[i];
      controller.fieldDisplay(wall[0], wall[1], 1);
    }
  }

  restart() {
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
    controller.player2.onTurn = false;

    //resetting game properties

    globalTime = 0;
    isShooting = false;
    isOk = false;
    walls = [];
    muds = [];
    gp3.clear();

    //redrawing board
    controller.gameBoardDisplay();
  }

  displayPlannedMove(x) {
    if (x[2] == 0) {
      this.fieldDisplay(x[0], x[1], 2);
    } else if (x[2] == 1) {
      let playerPosArray = [
        this.cordToPix(this.getOnTurn().ghostX),
        this.cordToPix(this.getOnTurn().ghostY),
      ];
      gp2.push();
      gp2.strokeWeight(3);
      gp2.stroke(0, 0, 255, 75);
      gp2.line(
        playerPosArray[0],
        playerPosArray[1],
        this.cordToPix(x[0]),
        this.cordToPix(x[1])
      );
      gp2.pop();
    } else {
      console.log("shit, somethings wrong in controller displayPlannedMove");
    }
  }

  displayAllPlannedMoves() {
    let moves = this.getOnTurn().plannedMoves;
    for (let i = 0; i < moves.length; i++) {
      this.displayPlannedMove(moves[i]);
    }
  }

  displayMuds() {
    let mud;
    for (let i = 0; i < muds.length; i++) {
      mud = muds[i];
      controller.fieldDisplay(mud[0], mud[1], 3);
    }
  }

  executePlan(plan) {
    let player = this.getOnTurn();
    let action;
    let length1 = plan.length
    if (plan.length > 0) {
      for (let i = 0; i < length1; i++) {
        action = plan[i];
        if (action[2] == 0) {
          player.x = action[0];
          player.y = action[1];
        } else if (action[2] == 1) {
          player.plannedMoves.splice(0,i+1)
          this.targetPos = this.doesHitWall(
            [player.x, player.y],
            [action[0], action[1]],
            600,
            true
          );
          isShooting = true;
          globalTime = 0;
          return;
        }
      }

      this.player1.onTurn = !this.player1.onTurn;
      this.player2.onTurn = !this.player2.onTurn;
      this.player1.actionPoints = 7;
      this.player2.actionPoints = 7;
      this.player1.plannedMoves = [];
      this.player2.plannedMoves = [];
       this.player1.ghostX = this.player1.x
        this.player2.ghostX = this.player2.x
        this.player1.ghostY = this.player1.y
        this.player2.ghostY = this.player2.y
    } else {
      this.player1.onTurn = !this.player1.onTurn;
      this.player2.onTurn = !this.player2.onTurn;
      this.player1.actionPoints = 7;
      this.player2.actionPoints = 7;
      this.player1.plannedMoves = [];
      this.player2.plannedMoves = [];
       this.player1.ghostX = this.player1.x
        this.player2.ghostX = this.player2.x
        this.player1.ghostY = this.player1.y
        this.player2.ghostY = this.player2.y
    }
  }

  doesHitWall(startCords, targetCords, acc, isShot) {
    let startX, startY, targetX, targetY, startV, targetV;
    let hits = false;
    let enemy = this.getNotOnTurn();
    let player = this.getOnTurn();
    startX = startCords[0];
    startY = startCords[1];
    targetX = targetCords[0];
    targetY = targetCords[1];
    startV = createVector(startX, startY);
    targetV = createVector(targetX, targetY);
    for (let i = 0; i < acc + 1; i++) {
      let tempV = p5.Vector.lerp(startV, targetV, i / acc);
      let temp = [ceil(tempV.array()[0]), ceil(tempV.array()[1])];
      if (this.isWall(temp)) {
        hits = true;
        return temp;
      } else if (temp[0] == enemy.x && temp[1] == enemy.y && isShot) {
        enemy.takeDamage(player.damage);
        hits = true;
        return temp;
      }
    }
    if (!hits) {
      return targetCords;
    }
  }
  
  
}