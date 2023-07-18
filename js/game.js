class Game {
    constructor(){
        this.startScreen = document.getElementById('game-intro')
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end')
        this.player = null;
        this.heigth = 600;
        this.width = 900;
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.player = new Player (
            this.gameScreen, 600, 400, 150, 100, "./assets/cyclist-riding-above-boy.jpg"
            );
    }

    start (){
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.gameLoop();
    }
    gameLoop(){
        // console.log("loop")
        if(this.gameIsOver){
           return;
        }
        this.update() // the game state
         // loop itself to create a recursive loop
        window.requestAnimationFrame(() => this.gameLoop());
    }

    update(){
        //console.log("update") 
        // this.player.updatePosition();
        this.player.move();  

         // Check for collision and if an obstacle is still on the screen
    for (let i = 0; i < this.obstacles.length; i++) {
        const obstacle = this.obstacles[i];
        obstacle.move();
        
    // If the player's car collides with an obstacle    
    if (this.player.didCollide(obstacle)) {
      // Remove the obstacle element from the DOM  
        obstacle.element.remove();
        // Reduce player's lives by 1
        this.obstacles.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        //this.lives -= 1; 
        this.lives--;
        i--;
    }
    // If the obstacle is off the screen (at the bottom)
    else if (obstacle.left > this.width){
        // Increase the score by 1
        //this.score += 1
        this.score++;
        // Remove the obstacle from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i,1)
        // Update the counter variable to account for the removed obstacle
        i--;
    }
    }

    // If the lives are 0, end the game
    if (this.lives === 0){
        this.endGame();
    }

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.99 && this.obstacles.length < 1) {
        this.obstacles.push(new Obstacle(this.gameScreen));
      }

}
    // creating the opponents car
    // for (i = 0; i < 3; i++) {
    // let Opponents = document.createElement('div');
    // Opponents.setAttribute('class', 'Opponents');
    // Opponents.y = ((i) * -300);
    // Opponents.style.top = Opponents.y + "px";
    // this.gameScreen.append(Opponents);
    // Opponents.style.left = Math.floor(Math.random() * 350) + "px";
    // // Opponents.style.backgroundColor=randomColor();
    // }

    // let car = document.createElement('div');
    // car.setAttribute('class', 'car');
    // this.gameScreen.append(car);
    // player.x = car.offsetLeft;
    // player.y = car.offsetTop;
    // }
    

    // Create a new method responsible for ending the game
    endGame(){
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        
        this.gameIsOver = true;
        
        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.gameEndScreen.style.display = "block";

    }
}

   

    

