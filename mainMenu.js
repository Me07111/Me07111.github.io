class MainMenu{
  constructor()
 {
  let start = windowWidth/2 - 300;
  this.inp1 = createInput(''); 
 this.inp1.position(start + 100,215)
  this.inp1.input(this.setPlayer1Name)
  this.inp2 = createInput('');
  this.inp2.position(start + 380,215)
  this.colorPicker1 = createColorPicker('#f8fc03');
  this.colorPicker1.position(start + 147,240)
  this.colorPicker2 = createColorPicker('#fc0303');
  this.colorPicker2.position(start + 430,240)
  this.inp2.input(this.setPlayer2Name)
  this.player1Name = "player 1";
  this.player2Name = "player 2";
  this.mudCheckbox = createCheckbox('Generate Mud?', true);
  this.mudCheckbox.position(start + 235,370)
  this.applyButton = new MyCanvas_Button( 250,420,[0,255,0],0,45,"Start",[100,45]);
  
  this.sel1 = createSelect();
  this.sel1.position(start + 125, 280);
  this.sel1.option("rectangle");
  this.sel1.option("circle");
  this.sel1.option('triangle');
  this.sel1.option('diamond');
  this.sel1.option("thin rectangle");
  this.sel1.selected('rectangle');
  
  this.sel2 = createSelect();
  this.sel2.position(start + 407, 280);
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
  this.applyButton.display();
  }
  
  setPlayer1Name(){
    controller.player1.name = this.value();
    console.log(controller.player1.name);
  }
  
  setPlayer2Name(){
    controller.player2.name = this.value();
    console.log(controller.player2.name);
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
}