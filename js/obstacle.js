export default class Obstacle {
    constructor(gameScreen){
        this.gameScreen = gameScreen;
        this.top = Math.floor(Math.random() * 350 + 50);
        this.left = 900;
        this.width = 150;
        this.height = 90;
        this.directionX = 0 ;// horizontal movement direction
        this.directionY = 0 ;
        this.element = document.createElement("img")
        this.element.src = "./assets/red-car.jpg" 
        this.element.style.position = "absolute";
        this.element.style.width = "150px"
        this.element.style.marginTop = "150px";
        // this.element.style.marginBottom = "50px";
        
    
        this.element.style.height = `${this.height}px`
        this.element.style.width = `${this.width}px`
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
       
        this.gameScreen.append(this.element)
    }
    move(){
    
    // Move the obstacle left by 3px
        this.left -= 3.5
        this.updatePosition();
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }
}