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
        this.width = 1150;
        this.obstacles = [];
        this.people = []; // add the new obstacles
        this.scoreDisplay = document.getElementById('score');
        this.score = 0;
        this.livesDisplay = document.getElementById('lives');
        this.lives = 3;
        this.gameIsOver = false;
        this.player = new Player (
            this.gameScreen, 100, 70, 80, 60, "./assets/cyclist-top-view.png"
            );
        this.timeStamp = Date.now() 
        this.personCarCrash = new Audio("./assets/audio/aoooooo-Wilhelm-Scream.mp3")
        this.bikeCarCrash = new Audio("./assets/audio/Car-Crash-Sound-Effect-Honk.mp3");
        this.bikePersonCrash = new Audio("./assets/audio/bicycle-bell.mp3")
        this.gameBackgroundSound = new Audio("./assets/audio/traffic-noise.mp3")
        
    }

    start (){
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.gameLoop();
        this.gameBackgroundSound.play();
    }
    gameLoop(){
        if(this.gameIsOver){
           return;
        }
    
        this.update() // the game state
         // loop itself to create a recursive loop
        window.requestAnimationFrame(() => this.gameLoop());
    }

    

    // generate all my obstacles and people============================

    // Create a new obstacle based on a random probability when there is no other obstacles on the screen

    generateObstacles (newTime, delta) {
        
        if (Math.random() > 0.987 && this.obstacles.length < 200 && delta > 1200){
              // Add a car to the game
          this.obstacles.push(new Obstacle(this.gameScreen));
          // avoid overlapping by delaying the generation of each person
          this.timeStamp = newTime
        }
      
        }; 

    generatePeople (newTime, delta) {
        
        if (Math.random() > 0.992 && this.people.length <180 && delta > 1900){
        // Add people to the game
              this.people.push(new Person(this.gameScreen));
              
            // avoid overlapping by delaying the generation of each person
              this.timeStamp = newTime
            }
              
            }; 

    // create method to check for car person collision            
    obstaclePersonCollisions() {
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            
            for (let j = 0; j < this.people.length; j++) {
                const person = this.people[j];
                if (obstacle.didCollide(person)) {
                // play person car crash sound
                this.personCarCrash.play()    
                // Remove the person element from the DOM
                person.element.remove();
                // Remove person from the array
                 this.people.splice(j, 1);
                // Update the counter variable to account for the removed person
                j -= 1;
                }
            }
        }
    }                    


    obstaclePlayerCollisions() {
        // Check for collision and if an obstacle is still on the screen
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();
            //console.log(obstacle);

            // If the player's car collides with an obstacle
            if (this.player.didCollide(obstacle)) {
                // play the bike crash sound
                this.bikeCarCrash.play()
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
            else if (obstacle.left + obstacle.width <= 0){
                // person.top + person.height <= 0
                // Increase the score by 1
                this.score += 1
                // this.score++;
                // Remove the obstacle from the DOM
                obstacle.element.remove();
                // Remove obstacle object from the array
                this.obstacles.splice(i,1)
                // Update the counter variable to account for the removed obstacle
                i+=1;
            }

        }
    }


    personPlayerCollisions(){

        // / Check for collision and if a person is still on the screen
        //for people ====================
        for (let j = 0; j < this.people.length; j++) {
            const person = this.people[j];
            person.move();
        
            // If the player's bike collides with a person
            if (this.player.didCollide(person)) {
                // play sound on crash when player hits a person
                this.bikePersonCrash.play()
            // Remove the person element from the DOM  
                person.element.remove();
                //remove person from array
                this.people.splice(j, 1);
                // Reduce player's lives by 1
                this.lives -= 1;
                // Update the counter variable to account for the removed person
                j-=1;
            }

            // If the person is off the screen (at the top)
            else if (person.top + person.height <= 0){ /// 
                // Increase the score by 1
                this.score += 1
                // Remove the perrson from the DOM
                person.element.remove();
                // Remove person object from the array
                this.people.splice(j,1)
                // Update the counter variable to account for the removed obstacle
                j-=1;
            }
        
        }
    }

    update(){
        const newTime = Date.now();
        const delta = newTime - this.timeStamp;
        
        this.player.move();  
        
        this.generateObstacles (newTime, delta);
        this.generatePeople (newTime, delta);
        this.obstaclePersonCollisions()
        this.obstaclePlayerCollisions()
        this.personPlayerCollisions()

        // update live the number of lives on screen 
        this.livesDisplay.textContent = `${this.lives}`;
        // update live the score on screen 
        this.scoreDisplay.textContent = `${this.score}`;

        // for obstacles and people
        // If the lives are 0, end the game
        if (this.lives === 0){
            this.endGame();
        }

    };


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
        this.gameEndScreen.style.backgroundImage = "./assets/cyclist-crash.jpg"

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
    

