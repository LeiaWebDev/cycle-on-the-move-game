class Obstacle {
    constructor(gameScreen){
        this.gameScreen = gameScreen;
        this.top = Math.floor(Math.random() * 300 + 70);
        this.left = 0;
        this.width = 150;
        this.height = 100;
        this.element = document.createElement("img")
        this.element.src = "./assets/red-car.jpg" 
        this.element.style.position = "absolute";
    
        this.element.style.height = `${this.height} px`
        this.element.style.width = `${this.width} px`
        this.element.style.left = `${this.left} px`
        this.element.style.top = `${this.top} px`
       
        this.gameScreen.append(this.element)
    }
    move(){
    
    // Move the obstacle down by 3px
        this.left += 3 
        this.updatePosition();
    }

    updatePosition(){
        this.element.style.left = `${this.left} px`
        this.element.style.top = `${this.top} px`
    }
}