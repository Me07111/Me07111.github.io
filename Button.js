
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

  display() {
    gp2.push();
    gp2.fill(this.color);
    gp2.rect(this.x, this.y, this.size[0], this.size[1]);
    gp2.pop();
    gp2.push();
    gp2.fill(this.textColor);
    gp2.textSize(this.textSize);
    gp2.textAlign(CENTER,CENTER);
    gp2.text(this.text, this.x + this.size[0] / 2, this.y + this.size[1] / 2);
    gp2.pop();
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
