class uiBar{
  constructor(pX,pY,pValue,pmaxValue,pTextSize,pName,pWidth,pHeight,pColor,pTextYOffset,pTextXOffset){
    this.x = pX;
    this.y = pY;
    this.value = pValue;
    this.maxValue = pmaxValue;
    this.textSize = pTextSize;
    this.name = pName;
    this.width = pWidth;
    this.height = pHeight;
    this.color = pColor;
    this.textXOffset = pTextXOffset;
    this.textYOffset = pTextYOffset;
  }
  
  display(){
    if(this.width * (this.value / this.maxValue) >= 0)
    {gp2.push()
    gp2.strokeWeight(0)
    gp2.fill(this.color)
    gp2.rect(this.x,this.y,this.width * (this.value / this.maxValue),this.height)
    gp2.pop()
    gp2.push()
    gp2.strokeWeight(0)
    gp2.fill (220)
    gp2.rect(this.x + this.width * (this.value / this.maxValue),this.y,this.width - this.width * (this.value / this.maxValue),this.height)
    gp2.pop()
    gp2.push()
    gp2.strokeWeight(0)
    gp2.fill(220)
    gp2.rect(this.x + this.textXOffset +0,this.y - this.textYOffset - 20,100,28)
    gp2.pop()
    gp2.push()
    gp2.stroke(0)
    gp2.strokeWeight(1)
    gp2.textSize(22)
    gp2.fill(this.color)
    gp2.text(this.name,this.x + this.textXOffset,this.y - this.textYOffset)
    gp2.pop()}
    else{
      console.log("health is less than zero(in ui bar)")
    }
  }
}