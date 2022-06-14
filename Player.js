class Player {
  constructor(pName,pX, pY, pColor, pHealth, pOnTurn, pActionPoints) {
    this.name = pName;
    this.x = pX;
    this.y = pY;
    this.color = pColor;
    this.health = pHealth;
    this.onTurn = pOnTurn;
    this.actionPoints = pActionPoints;
    this.plannedMoves = [];
    this.wantsToshoot = false;
    this.ghostX = pX;
    this.ghostY = pY;
    this.lastMinuses = [];
    this.damage = 20;
  }
  display(shape) {
    switch(shape){ 
        case "rectangle":
    gp4.push();
    gp4.fill(this.color);
    gp4.rect(
      controller.cordToPix(this.x) - 5,
      controller.cordToPix(this.y) - 5,
      10,
      10
    );
    gp4.pop();
    break;
      case "circle":
        gp.push();
    gp4.fill(this.color);
    gp4.circle(
      controller.cordToPix(this.x),
      controller.cordToPix(this.y),
      10
    );
    gp4.pop();
    break;
      case "triangle":
        gp.push();
    gp4.fill(this.color);
    gp4.triangle(controller.cordToPix(this.x),controller.cordToPix(this.y) - 5,controller.cordToPix(this.x)+5,controller.cordToPix(this.y) + 5,controller.cordToPix(this.x)-5,controller.cordToPix(this.y) + 5)
    gp4.pop();
    break;
    
     case "diamond":
    let x = controller.cordToPix(this.x);
    let y = controller.cordToPix(this.y);
    gp4.push();
    gp4.fill(this.color);
    gp4.quad(x-5,y,x,y-5,x+5,y,x,y+5)
    gp4.pop();
    break;
    
    case "thin rectangle":
        gp4.push();
    gp4.fill(this.color);
    gp4.rect(
      controller.cordToPix(this.x) - 3,
      controller.cordToPix(this.y) - 5,
      6,
      10
    );
    gp4.pop();
    break;
    
    default:
    console.log("somethings wrong in player.display")    
    break;
  }
  }

  plannedInput(cords) {
    let plannedAction = cords;
    if (this.actionPoints > 0) {
      // walking from mud
      if (this.canReach(plannedAction) && !this.wantsToShoot) {
        if(controller.isMud([this.ghostX,this.ghostY])){
          if (this.actionPoints > 1){
            plannedAction.push(0);
        this.plannedMoves.push(plannedAction);
        this.actionPoints-= 2;
        this.lastMinuses.push(2);
        this.ghostX = plannedAction[0];
        this.ghostY = plannedAction[1];
        controller.displayPlannedMove(plannedAction)
          }
        } else 
          //walking
        {plannedAction.push(0);
        this.plannedMoves.push(plannedAction);
        this.actionPoints--;
        this.lastMinuses.push(1);
        this.ghostX = plannedAction[0];
        this.ghostY = plannedAction[1];
        controller.displayPlannedMove(plannedAction)}
      } else {
        //shooting
        plannedAction = controller.doesHitWall([this.ghostX,this.ghostY],[plannedAction[0],plannedAction[1]],600,false)
        let distance = dist(this.ghostX,this.ghostY,plannedAction[0],plannedAction[1])
        let minusPoints = round(distance/3.5,0)
        if (this.wantsToShoot && this.actionPoints >= minusPoints) {
          plannedAction.push(1);
          this.plannedMoves.push(plannedAction);
          controller.displayPlannedMove(plannedAction)
          this.actionPoints -= minusPoints;
          this.lastMinuses.push(minusPoints);
        }
      }
      //else{console.log("shit")}
    }
  }
  
  canReach(cords) {
    if(!this.isInPlanned(cords))  
    {
      if (
        (abs(this.ghostX - cords[0]) == 1 && this.ghostY - cords[1] == 0) ||
        (abs(this.ghostY - cords[1]) == 1 && this.ghostX - cords[0] == 0)
      ) {
        if(controller.isWall(cords) == false){
        return true
        } else
        { 
          return false
        }
      }}
    }
  
  takeDamage(damage){
    this.health -= damage;
    if(this.health <= 0){ 
      this.health = 0
      console.log(this.name +" died!")
    }
  }
  
  isInPlanned(cords){
    let move;
    for(let i = 0; i <this.plannedMoves.length;i++){
      move = this.plannedMoves[i]
      if(cords[0] == move[0] && cords[1] == move[1]){
        return true
      }
    }
    return false
  }
  
  planByDir(dir){
    switch(dir){
      case "up":
        this.plannedInput([this.ghostX,this.ghostY - 1])
        break;
        
        case "down":
        this.plannedInput([this.ghostX,this.ghostY + 1])
        break;
        
        case "left":
        this.plannedInput([this.ghostX -1,this.ghostY])
        break;
        
        case "right":
        this.plannedInput([this.ghostX +1,this.ghostY])
        break;
        
      default:
        console.log("something is wrong in player.planByDir")
        break;
    }
  }
  }
