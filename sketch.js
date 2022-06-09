
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  generateMap()
}

function draw() {
}

function fieldDisplay(x,y,type){
   x = x * 10;
    y = y * 10;
    switch (type) {
      //grass
      case 0:
        let grassColor = round(random(100,180))
        push();
        fill(0, grassColor, 0);
        strokeWeight(0.5);
        rect(x, y, 10);
        push();
        break;
      //wall
      case 1:
        let wallColor = round(random(90,150))
        push();
        fill(wallColor);
        strokeWeight(0.5);
        rect(x, y, 10);
        push();
        break;
      //players planned move
      case 2:
        let wotahColor = round(random(100,255))
        let wotahGr = round(random(0,100))
        push();
        fill(0, wotahGr, wotahColor);
        strokeWeight(0.5);
        rect(x, y, 10);
        push();
        break;
        //mud
        case 3:
        let mudColor = round(random(30,70))
        push();
        fill(mudColor, 13, 13, 200);
        strokeWeight(0.5);
        rect(x, y, 10);
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
          fieldDisplay(x,y,1)
        }
        break;
        
        case 1:
        xPlus = 0;
        yPlus = 1;
        wallLength =  random(1,5);
        for(let i = 0;i < wallLength; i++){
          x += xPlus;
          y += yPlus;
          fieldDisplay(x,y,1)
        }
        break;
        
        case 2:
        xPlus = -1;
        yPlus = -1;
        wallLength =  random(1,5);
        for(let i = 0;i < wallLength; i++){
          x += xPlus;
          y += yPlus;
          fieldDisplay(x,y,1)
        }
        break;
        
        case 3: 
        xPlus = -1;
        yPlus = 1;
        wallLength =  random(1,5);
        for(let i = 0;i < wallLength; i++){
          x += xPlus;
          y += yPlus;
          fieldDisplay(x,y,1)
        }
        break;
        default:
        console.log("something is wrong")
        break;
    }
}

function generateMap1(){
  walls = []
    for (let i = 0; i < windowWidth/10*10; i++) {
      for (let j = 0; j < windowHeight/10*10; j++) {
        if(round(random(1,25)) == 1){
        fieldDisplay(i, j, 1);
          fieldDisplay(i,j,1)
          randomWall(i,j)
        } else {
           fieldDisplay(i, j, 0)
     } 
    }
  }
}

function generateMap(){
    let rand;
    for (let i = 0; i < windowWidth/10; i++) {
      for (let j = 0; j < windowHeight/10; j++) {
        rand = round(random(1, 25))
        if (rand == 1) {
          randomWall(i, j);
        } else if (rand == 2) {
          fieldDisplay(i, j, 3)
        } else if(rand == 3) {
           fieldDisplay(i, j, 2)
        }
        else{
          fieldDisplay(i, j, 0);
        }
      }
    }
}

function mousePressed(){
  generateMap()
}
