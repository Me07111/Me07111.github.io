class MainMenu{
  constructor()
 { this.inp1 = createInput('');
  this.inp1.position(100,215)
  this.inp1.input(this.setPlayer1Name)
  this.inp2 = createInput('');
  this.inp2.position(380,215)
  this.inp2.input(this.setPlayer2Name)
  this.colorPicker1 = createColorPicker('#f8fc03');
  this.colorPicker1.position(147,240)
  this.colorPicker2 = createColorPicker('#fc0303');
  this.colorPicker2.position(430,240)
  this.player1Name = "player 1";
  this.player2Name = "player 2";
  this.mudCheckbox = createCheckbox('Generate Mud?', true);
  this.mudCheckbox.position(235,370)
  this.applyButton = new My_Button( 250,420,[0,255,0],0,45,"Start",[100,45]);
  this.player1ResetButton = new My_Button( 132,308,[255,25,30],0,24,"Reset",[100,28]);
  this.player2ResetButton = new My_Button( 415, 308,[255,25,30],0,24,"Reset",[100,28]);
  
  this.sel1 = createSelect();
  this.sel1.position(125, 280);
  this.sel1.option("rectangle");
  this.sel1.option("circle");
  this.sel1.option('triangle');
  this.sel1.option('diamond');
  this.sel1.option("thin rectangle");
  this.sel1.selected('rectangle');
  
  this.sel2 = createSelect();
  this.sel2.position(407, 280);
  this.sel2.option("rectangle");
  this.sel2.option("circle");
  this.sel2.option("triangle");
  this.sel2.option('diamond');
  this.sel2.option("thin rectangle");
  this.sel2.selected("rectangle");
 }
  
  display()
  {
  push()
  stroke(0)
  strokeWeight(1)
  fill(0,255,0)
  textSize(50)
  text("Main Menu",165,90)
  pop()
  push()
  stroke(0)
  strokeWeight(1)
  fill(this.colorPicker1.color())
  textSize(40)
  text("player 1",110,200)
  fill(0)
  textSize(27)
  text("Name:",10,232)
  pop()
  push()
  stroke(0)
  strokeWeight(1)
  fill(this.colorPicker2.color())
  textSize(40)
  text("player 2",384,195)
  fill(0)
  textSize(27)
  text("Name:",290,232)
  pop()
  this.applyButton.display("canvas");
  this.player1ResetButton.display("canvas")
  this.player2ResetButton.display("canvas")
  }
  
  setPlayer1Name(){
    controller.player1.name = this.value();
  }
  
  setPlayer2Name(){
    controller.player2.name = this.value();
  }
  
  apply(){
    controller.player1.color = mainMenu.colorPicker1.color();
    controller.player2.color = mainMenu.colorPicker2.color();
    controller.genMud = mainMenu.mudCheckbox.checked()
    controller.player1shape = mainMenu.sel1.value()
    controller.player2shape = mainMenu.sel2.value()
    removeElements();
    inMenu = false;
    clear()
    background(220)
    controller.gameBoardDisplay();
  }

  resetP1(){
  mainMenu.sel1 = createSelect();
  mainMenu.sel1.position(125, 280);
  mainMenu.sel1.option("rectangle");
  mainMenu.sel1.option("circle");
  mainMenu.sel1.option('triangle');
  mainMenu.sel1.option('diamond');
  mainMenu.sel1.option("thin rectangle");
  mainMenu.sel1.selected('rectangle');
  mainMenu.player1Name = "player 1";
  mainMenu.colorPicker1 = createColorPicker('#f8fc03');
  mainMenu.colorPicker1.position(147,240)
  mainMenu.inp1 = createInput('');
  mainMenu.inp1.position(100,215)
  mainMenu.inp1.input(mainMenu.setPlayer1Name)
  mainMenu.display()
  }
  
  resetP2(){
  mainMenu.sel2 = createSelect();
  mainMenu.sel2.position(407, 280);
  mainMenu.sel2.option("rectangle");
  mainMenu.sel2.option("circle");
  mainMenu.sel2.option('triangle');
  mainMenu.sel2.option('diamond');
  mainMenu.sel2.option("thin rectangle");
  mainMenu.sel2.selected('rectangle');
  mainMenu.player2Name = "player 2";
  mainMenu.colorPicker2 = createColorPicker('#fc0303');
  mainMenu.colorPicker2.position(430,240)
  mainMenu.inp2 = createInput('');
  mainMenu.inp2.position(380,215)
  mainMenu.inp2.input(mainMenu.setPlayer2Name)
  mainMenu.display()
  }
  
  previewDisplay(x,y,color,type){
    push();
    fill(220);
    strokeWeight(0)
    rect(
      x - 10,
      y - 8,
      20,
      15
    );
    pop();
    switch(type){ 
        case "rectangle":
    push();
    fill(color);
    rect(
      x - 5,
      y - 5,
      10,
      10
    );
    pop();
    break;
      case "circle":
    push();
    fill(color);
    circle(
      x,
      y,
      10
    );
    pop();
    break;
      case "triangle":
    push();
    fill(color);
    triangle(x,y - 5,x+5,y + 5,x-5,y + 5)
    pop();
    break;
    
     case "diamond":
    push();
    fill(color);
    quad(x-5,y,x,y-5,x+5,y,x,y+5)
    pop();
    break;
    
    case "thin rectangle":
        push();
    fill(color);
    rect(
      x - 3,
      y - 5,
      6,
      10
    );
    pop();
    break;
    
    default:
    console.log("somethings wrong in mainMenu.display")    
    break;
  }
  }
}