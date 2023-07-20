import Game from './game.js'

    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    let game;
    let isMoving = false; // track movement

    startButton.addEventListener("click", function () {
      startGame();
    });
  
    function startGame() {
    //   console.log("start game");
        game = new Game()
        game.start()
    }


 // Function that handles keydown event
    function handleKeydown(event) {
      const key = event.key;
      const possibleKeystrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
      ];
    
      // Check if the pressed key is in the possibleKeystrokes array
      if (possibleKeystrokes.includes(key)) {
        event.preventDefault();

       if (!isMoving) {
          isMoving = true; // Start the movement

        // Update player's directionX and directionY based on the key pressed
          switch (key) {
            case "ArrowLeft":
              game.player.directionX = -7;
              break;
            case "ArrowUp":
              game.player.directionY = -7;
              break;
            case "ArrowRight":
              game.player.directionX = 7;
              break;
            case "ArrowDown":
              game.player.directionY = 7;
              break;
          } 

          // Reset the movement after a short delay (adjust the duration as needed)
        setTimeout(() => {
          isMoving = false;
        }, 200);

      }
    }
  }

    // Function that handles keyup event
    function handleKeyup (event) {
      const key = event.key;
      const possibleKeystrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
      ];
      // Check if the released key is in the possibleKeystrokes array
      if (possibleKeystrokes.includes(key)) {
        event.preventDefault();

      //  if (!isMoving) {
      //     isMoving = true; // no movement

          // Update player's directionX and directionY based on the key
          switch (key) {

            case "ArrowLeft":
            case "ArrowRight":
              game.player.directionX = 0;
              break;
            case "ArrowUp":
            case "ArrowDown":
              game.player.directionY = 0;
              break;
              
          } 
        }
      }

      // if (key === "ArrowRight") {
      //   rightPressed = false;
      // } else if (key === "ArrowLeft") {
      //   leftPressed = false;
      // }
    

  
    // Reset the movement after a short delay (adjust the duration as needed)
    setTimeout(() => {
      isMoving = false;
    }, 400);

  
    // Add the handleKeydown function as an event listener for the keydown event
    window.addEventListener("keydown", handleKeydown);

    // Add the keyUpHandler function as an event listener for the keyup event
    window.addEventListener("keyup", handleKeyup);


    // Add an event listener to the restart button
    restartButton.addEventListener("click", function () {
        restartGame() ;
        });
    
    function restartGame() {
        location.reload();
        }











   
    
  