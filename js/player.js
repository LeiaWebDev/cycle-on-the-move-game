class Player {
    constructor(gameScreen, left, top, width, height, src){
    this.gameScreen = gameScreen;
    this.left = left; // the horizontal move left position of the bike
    this.top = top; // the vertical up position of the bike 
    this.width = width;
    this.height = height;
    this.DirectionX = 0 ; // horizontal movement direction
    this.DirectionY = 0 ; // vertical movement direction
    this.element = document.createElement("img") // the image element representing the bike 
    this.element.src = "./assets/cyclist-riding-above.png"
    this.element.style.position = "absolute";

    //URL("images/car.png");
    this.element.style.height = `${height} px`
    this.element.style.width = `${width} px`
    this.element.style.left = `${left} px`
    this.element.style.top = `${top} px`
    
   
    this.gameScreen.append(this.element)
}
move(){
    //update bike's position
    this.left += this.DirectionX;
    this.top += this.DirectionY;

    // boundaries of the screen are respected
   if (this.left < 10){
    this.left = 10
   }
   if (this.top < 10){
    this.top = 10
   }
   //  right and bottom hand side
   if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
    this.left = this.gameScreen.offsetWidth - this.width - 10;
  }
  if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
    this.top = this.gameScreen.offsetHeight - this.height - 10;
  }
  this.updatePosition()
}

updatePosition(){
    // Update the player's bike position on the screen
    this.element.style.left = `${this.left} px`
    this.element.style.top = `${this.top} px`
}
didCollide(obstacle){
    // Checks if the player's bike collides with an obstacle
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();
    if (
        playerRect.left <= obstacleRect.right &&
        playerRect.right >= obstacleRect.left &&
        playerRect.top <= obstacleRect.bottom &&
        playerRect.bottom >= obstacleRect.top 
        ) {
        return true
    } else {
        return false
    }


}
}


