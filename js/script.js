import Game from './game.js'

    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    let game;
    let isMoving = false;

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
            game.player.directionX = -2;
            break;
          case "ArrowUp":
            game.player.directionY = -2;
            break;
          case "ArrowRight":
            game.player.directionX = 2;
            break;
          case "ArrowDown":
            game.player.directionY = 2;
            break;
            
        } 
      }
    }
    // Reset the movement after a short delay (adjust the duration as needed)
    setTimeout(() => {
      isMoving = false;
    }, 400);

  }
    // Add the handleKeydown function as an event listener for the keydown event
    window.addEventListener("keydown", handleKeydown);


    // Add an event listener to the restart button
    restartButton.addEventListener("click", function () {
        restartGame() ;
        });
    
    function restartGame() {
        location.reload();
        }











   
    
  