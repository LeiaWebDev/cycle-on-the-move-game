
window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    let game;
    

    startButton.addEventListener("click", function () {
      startGame();
    });
  
    function startGame() {
    //   console.log("start game");
        let game;
        Game = new Game()
        Game.start()
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
    
        // Update player's directionX and directionY based on the key pressed
        switch (key) {
          case "ArrowLeft":
            Game.player.directionX = -1;
            break;
          case "ArrowUp":
            Game.player.directionY = 1;
            break;
          case "ArrowRight":
            Game.player.directionX = 1;
            break;
          case "ArrowDown":
            Game.player.directionY = -1;
            break;
        }
      }
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

    };










   
    
  