//import Obstacle from "./obstacle.js";
const randomPeopleImages = [
    './assets/people/walking-man1.png',
    './assets/people/walking-man2.png',
    './assets/people/walking-man3.png',
    './assets/people/walking-woman1.png',
    './assets/people/walking-woman2.png',
    './assets/people/walking-woman3.png',
]
export default class Person {
    constructor(gameScreen){
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 850 + 30);
        this.top = 600; 
        this.height = 50;
        this.width = 70;
        this.directionX = 0 ;// horizontal movement direction
        this.directionY = 0 ;// vertical movement direction
        this.element = document.createElement("img")
        this.element.src = randomPeopleImages[Math.floor(Math.random() * randomPeopleImages.length)]
        this.element.style.position = "absolute";
        //this.element.style.marginBottom = "100px";
        
        this.element.style.height = `${this.height}px`
        this.element.style.width = `${this.width}px`
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
       
        this.gameScreen.append(this.element)
    }
    move(){
    
    // Move the person top by 1.5px
        this.left -= 0.5
        this.top -= 1.7
        this.updatePosition();
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }


    // check for collision with obstacles
    didCollide(obstacle){
        // Checks if the obstacle collides with a person
        const personRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
        if (
            personRect.left <= obstacleRect.right &&
            personRect.right >= obstacleRect.left &&
            personRect.top <= obstacleRect.bottom &&
            personRect.bottom >= obstacleRect.top 
            ) {
            return true
        } else {
            return false
        }


    }


}