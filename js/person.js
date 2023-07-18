// import Obstacle from "./obstacle";

export default class Person {
    constructor(gameScreen){
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 350 + 50);
        this.top = 600;
        this.height = 100;
        this.width = 150;
        this.directionX = 0 ;// horizontal movement direction
        this.directionY = 0 ;
        this.element = document.createElement("img")
        this.element.src = "./assets/walking-man-from-above.png" 
        this.element.style.position = "absolute";
        this.element.style.width = "50px"
        //this.element.style.marginBottom = "100px";
        // this.element.style.marginBottom = "50px";
        
    
        this.element.style.height = `${this.height}px`
        this.element.style.width = `${this.width}px`
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
       
        this.gameScreen.append(this.element)
    }
    move(){
    
    // Move the obstacle top by 3px
        this.top -= 3
        this.updatePosition();
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }
}