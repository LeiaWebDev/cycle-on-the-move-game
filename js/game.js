import Player from './player.js';
import Obstacle from './obstacle.js';
import Person from './person.js';


export default class Game {
    constructor(){
        this.startScreen = document.getElementById('game-intro')
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end')
        this.player = null;
        this.height = 600;
        this.width = 1100;
        this.obstacles = [];
        this.people = []; // add the new obstacles
        this.scoreDisplay = document.getElementById('score');
        this.score = 0;
        this.livesDisplay = document.getElementById('lives');
        this.lives = 3;
        this.gameIsOver = false;
        this.player = new Player (
            this.gameScreen, 100, 70, 80, 60, "./assets/cyclist-riding-above-boy.jpg"
            );
        this.timeStamp = Date.now() 
        
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
        const newTime = Date.now()
        const delta = newTime - this.timeStamp;
        // console.log(this.people)
        
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
                //remove obstacle from array
                this.obstacles.splice(i, 1);
                // Reduce player's lives by 1
                this.lives -= 1;
                // Update the counter variable to account for the removed obstacle
                i-=1;
            }
    // If the obstacle is off the screen (at the left)
            else if (obstacle.left > this.width){
                // Increase the score by 1
                this.score += 1
                // this.score++;
                // Remove the obstacle from the DOM
                obstacle.element.remove();
                // Remove obstacle object from the array
                this.obstacles.splice(i,1)
                // Update the counter variable to account for the removed obstacle
                i-=1;
            }

        // update live the number of lives on screen 
        this.livesDisplay.textContent = `${this.lives}`;
        // update live the score on screen 
        this.scoreDisplay.textContent = `${this.score}`;
        

        // Create a new obstacle based on a random probability
        // when there is no other obstacles on the screen
        if (Math.random() > 0.995 && this.obstacles.length < 70 && delta > 500) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }



           

            // for people ====================
        // for (let i = 0; i < this.people.length; i++) {
        //     const person = this.people[i];
        //     person.move();
        
        //     // If the player's bike collides with a person
        //     if (this.player.didCollide(person)) {
        //     // Remove the person element from the DOM  
        //         person.element.remove();
        //         //remove person from array
        //         this.people.splice(i, 1);
        //         // Reduce player's lives by 1
        //         this.lives -= 1;
        //         // Update the counter variable to account for the removed person
        //         i-=1;
        //     }
        //     // If the person is off the screen (at the left)
        //     else if (person.top > this.height){
        //         // Increase the score by 1
        //         this.score += 1
        //         // Remove the perrson from the DOM
        //         person.element.remove();
        //         // Remove person object from the array
        //         this.people.splice(i,1)
        //         // Update the counter variable to account for the removed obstacle
        //         i-=1;
        //     }

        //         // update live the number of lives on screen 
        //         this.livesDisplay.textContent = `${this.lives}`;
        //         // update live the score on screen 
        //         this.scoreDisplay.textContent = `${this.score}`;
        
        // }

        // Create a new person based on a random probability
        // when there is no other person on the screen
        console.log(this.people)
        if (Math.random() > 0.9 && this.people.length < 10 && delta > 500) {
            this.people.push(new Person(this.gameScreen));
        }


        // for obstacles and people
        // If the lives are 0, end the game
        if (this.lives === 0){
            this.endGame();
        }

    };

    }

    // Create a new method responsible for ending the game
    endGame(){
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.people.forEach(person => person.element.remove());
        this.gameIsOver = true;
        
        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.gameEndScreen.style.display = "block";

    }
    

    

}

   










    
    // generatePeople() {
    //     const numPeople = 3; // Number of people to generate
    
    //     for (let i = 0; i < numPeople; i++) {
    //       // Generate random position within the game screen
    //       const left = Math.floor(Math.random() * (this.gameScreen.offsetWidth - personWidth));
    //       const top = Math.floor(Math.random() * (this.gameScreen.offsetHeight - personHeight));
    
    //       // Create person instance
    //       const person = new Person(this.gameScreen, left, top, personWidth, personHeight);
    
    //       // Add person to the game
    //       this.people.push(person);
    //     }
    //   }




      //To allow for multiple obstacles to be generated, we could create a new variable 
    //   let desiredNumberOfObstacles = 5;
    //   if (Math.random() > 0.98 && this.obstacles.length < desiredNumberOfObstacles) {
    //     this.obstacles.push(new Obstacle(this.gameScreen));
    //   }
      
    //   if (this.obstacles.length < desiredNumberOfObstacles) {
    //     // Create new obstacles even after reaching the desired number
    //     this.obstacles.push(new Obstacle(this.gameScreen));
    //   }


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
    

