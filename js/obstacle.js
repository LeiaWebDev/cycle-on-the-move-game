const randomCarsImages = [
    './assets/cars/blue-car-big.png',
    './assets/cars/green-car.png',
    './assets/cars/orange-car.png',
    './assets/cars/black-car.png',
    './assets/cars/red-car.png',
    './assets/cars/grey-car-long.png',
    './assets/cars/pink-car.png',
    './assets/cars/yellow-car.png',
    './assets/cars/yellow-car-luxe.png',
]
export default class Obstacle {
    constructor(gameScreen){
        this.gameScreen = gameScreen;
        this.top = Math.floor(Math.random() * 350 + 20);
        this.left = 1100;
        this.width = 150;
        this.height = 90;
        this.directionX = 0 ;// horizontal movement direction
        this.directionY = 0 ;
        this.element = document.createElement("img");
        this.element.src = randomCarsImages[Math.floor(Math.random() * randomCarsImages.length)]
        this.element.style.position = "absolute";
        this.element.style.width = "150px";
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
        this.left -= 3
        this.updatePosition();
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }

    // check for collision with people
    didCollide(person){
        // Checks if the obstacle  collides with a person
        const obstacleRect = this.element.getBoundingClientRect();
        const personRect = person.element.getBoundingClientRect();
        if (
            obstacleRect.left <= personRect.right &&
            obstacleRect.right >= personRect.left &&
            obstacleRect.top <= personRect.bottom &&
            obstacleRect.bottom >= personRect.top 
            ) {
            return true
        } else {
            return false
        }


    }
    
}