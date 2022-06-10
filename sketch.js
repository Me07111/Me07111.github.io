var muds = []
var walls = []
var wotahs = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,255,0);
  generateMap()
}

function draw() {
}

function fieldDisplay(x,y,type,opMin){
   x = x * 10;
    y = y * 10;
  let diam = (round(random(2,100)));
  let rndOpMin = opMin;
  let rColor = [random(0,255),random(0,255),random(0,255),random(100-diam,255-100-diam + 50)]
    switch (type) {
      //grass
      case 0:
        push();
        fill(rColor);
        strokeWeight(0);
        circle(x, y, diam);
        push();
        break;
      //wall
      case 1:
        push();
        fill(rColor);
        strokeWeight(0);
        circle(x, y, diam);
        push();
        break;
      //players planned move
      case 2:
        push();
        fill(rColor);
        strokeWeight(0);
        circle(x, y, diam);
        push();
        break;
        //mud
        case 3:
        push();
        fill(rColor);
        strokeWeight(0);
        circle(x, y, diam);
        push();
        break;
      default:
        console.log("something is wrong in controller.fieldDisplay");
        break;
    }
}
  
function randomWall(x,y){
  let type = round(random(0,3))
  let xPlus;
  let yPlus;
  let wallLenght;
  switch(type)
    {
        
        case 0:
        xPlus = 0;
        yPlus = -1;
        wallLength =  random(1,5);
        for(let i = 0;i < wallLength; i++){
          x += xPlus;
          y += yPlus;
          walls.push([x,y])
        }
        break;
        
        case 1:
        xPlus = 0;
        yPlus = 1;
        wallLength =  random(1,5);
        for(let i = 0;i < wallLength; i++){
          x += xPlus;
          y += yPlus;
          walls.push([x,y])
        }
        break;
        
        case 2:
        xPlus = -1;
        yPlus = -1;
        wallLength =  random(1,5);
        for(let i = 0;i < wallLength; i++){
          x += xPlus;
          y += yPlus;
          walls.push([x,y])
        }
        break;
        
        case 3: 
        xPlus = -1;
        yPlus = 1;
        wallLength =  random(1,5);
        for(let i = 0;i < wallLength; i++){
          x += xPlus;
          y += yPlus;
          walls.push([x,y])
        }
        break;
        default:
        console.log("something is wrong")
        break;
    }
}


function generateMap(){
     muds = []
     walls = []
     wotahs = []
  background(0,200,0)
let randOp = random(10,150)
    let rand;
    for (let i = 0; i < windowWidth/10; i++) {
      for (let j = 0; j < windowHeight/10; j++) {
        rand = round(random(1, 25))
        if (rand == 1) {
          walls.push([i,j])
          randomWall(i, j);
        } else if (rand == 2) {
          wotahs.push([i, j])
        } else if(rand == 3) {
           muds.push([i, j])
        }
        else{
          fieldDisplay(i, j, 0,randOp);
        }
      }
    }

  displayNotGrass()
}

function mousePressed(){
  generateMap()
}

function displayNotGrass(){
  let randOp = random(10,150)
  for(let i = 0; i < walls.length;i++){
    let wall = walls[i]
    fieldDisplay(wall[0],wall[1],1,randOp)
  }
  
  for(let i = 0; i < muds.length;i++){
    let mud = muds[i]
    fieldDisplay(mud[0],mud[1],3,randOp)
  }
  
  for(let i = 0; i < wotahs.length;i++){
    let wotah = wotahs[i]
    fieldDisplay(wotah[0],wotah[1],2,randOp)
  }
}
