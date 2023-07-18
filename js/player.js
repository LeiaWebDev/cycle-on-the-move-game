export default class Player {
    constructor(gameScreen, left, top, width, height){
    this.gameScreen = gameScreen;
    this.left = left; // the horizontal move left position of the bike
    this.top = top; // the vertical up position of the bike 
    this.width = width;
    this.height = height;
    this.directionX = 0 ; // horizontal movement direction
    this.directionY = 0 ; // vertical movement direction
    this.element = document.createElement("img") // the image element representing the bike 
    this.element.src = "./assets/cyclist-riding-above-boy.jpg"
    this.element.style.position = "absolute";
    this.element.style.left = "10px";
    this.element.style.marginTop = "150px";
    // this.element.style.marginBottom = "150px";
    this.element.style.width = "150px"

    this.element.style.height = `${this.height} px`
    this.element.style.width = `${this.width} px`
    this.element.style.left = `${this.left} px`
    this.element.style.top = `${this.top} px`
    
    this.gameScreen.append(this.element)
}
move(){
    //update bike's position
    this.left += this.directionX;
    this.top += this.directionY;

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
//   if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
//     this.top = this.gameScreen.offsetHeight - this.height - 10;
//   }

// Restrict the player's position within 150 pixels from the bottom of the screen
    const marginBottom = this.gameScreen.offsetHeight - this.height - 150;
        if (this.top > marginBottom) {
        this.top = marginBottom;
        }

  this.updatePosition()
}

updatePosition(){
    // Update the player's bike position on the screen
    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`
}


// check for collision for obstacles
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

// check for collision for people
didCollide(person){
    // Checks if the player's bike collides with a person
    const playerRect = this.element.getBoundingClientRect();
    const personRect = person.element.getBoundingClientRect();
    if (
        playerRect.left <= personRect.right &&
        playerRect.right >= personRect.left &&
        playerRect.top <= personRect.bottom &&
        playerRect.bottom >= personRect.top 
        ) {
        return true
    } else {
        return false
    }


}







}


