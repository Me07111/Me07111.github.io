
class My_Button {
  constructor(
    pX,
    pY,
    pColor,
    pTextColor,
    pTextSize,
    pText,
    pSize
  ) {
    this.x = pX;
    this.y = pY;
    this.color = pColor;
    this.textColor = pTextColor;
    this.textSize = pTextSize;
    this.text = pText;
    this.size = pSize;
  }

  display(graphics) {
    if(graphics == "canvas"){
       push();
    fill(this.color);
    rect(this.x, this.y, this.size[0], this.size[1]);
    pop();
    push();
    fill(this.textColor);
    textSize(this.textSize);
    textAlign(CENTER,CENTER);
    text(this.text, this.x + this.size[0] / 2, this.y + this.size[1] / 2);
    pop();
       } else {
    graphics.push();
    graphics.fill(this.color);
    graphics.rect(this.x, this.y, this.size[0], this.size[1]);
    graphics.pop();
    graphics.push();
    graphics.fill(this.textColor);
    graphics.textSize(this.textSize);
    graphics.textAlign(CENTER,CENTER);
    graphics.text(this.text, this.x + this.size[0] / 2, this.y + this.size[1] / 2);
    graphics.pop();
 }  
}

  checker(pX, pY, func) {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.size[0] &&
      mouseY > this.y &&
      mouseY < this.y + this.size[1]
    ) {
      func();
      }
  }
}
