let controlledSquare = document.getElementById('controlledSquare');
let targetIframe = document.getElementById('targetIframe');
let gameLoop;
let isWhite = false;

// Function to handle gamepad input
function handleInput() {
  const gamepads = navigator.getGamepads();
  if (gamepads.length === 0 || !gamepads[0]) {
    // No gamepads connected
    return;
  }

  const gamepad = gamepads[0]; // Assuming the first gamepad

  // Joystick movement (Example: Left joystick axes 0 and 1)
  const joystickX = gamepad.axes[0];
  const joystickY = gamepad.axes[1];

  // Adjust sensitivity if needed
  const sensitivity = 5;

  // Move the square based on joystick input
  controlledSquare.style.left = (parseFloat(controlledSquare.style.left) + joystickX * sensitivity) + 'px';
  controlledSquare.style.top = (parseFloat(controlledSquare.style.top) + joystickY * sensitivity) + 'px';

  // Trigger color change (Example: Left trigger button 6)
  if (gamepad.buttons[6].pressed && !isWhite) {
    controlledSquare.style.backgroundColor = 'white';
    isWhite = true;
  } else if (!gamepad.buttons[6].pressed && isWhite) {
    controlledSquare.style.backgroundColor = 'black';
    isWhite = false;
  }

  // Left click simulation (Example: Button 0 - A button)
  if (gamepad.buttons[0].pressed) {
    simulateClick('left');
  }

  // Right click simulation (Example: Button 1 - B button)
  if (gamepad.buttons[1].pressed) {
    simulateClick('right');
  }
}

// Function to simulate a click (can be extended for right-click simulation)
function simulateClick(buttonType) {
  // Get the iframe's content window
  const iframeWindow = targetIframe.contentWindow;

  if (iframeWindow) {
    // You'll need to figure out where in the iframe to "click" based on your needs.
    // For this example, we'll just log a message to the console.
    console.log(`${buttonType} click simulated in iframe.`);

    // To simulate a click on a specific element within the iframe, you'd need to:
    // 1. Get a reference to the element inside the iframe (e.g., using iframeWindow.document.getElementById('elementId')).
    // 2. Trigger the click event on that element (e.g., element.click()).
    // IMPORTANT: Cross-origin restrictions apply. You can only interact with iframes from the same domain or if they are explicitly allowed via features like postMessage.
  }
}

// Animation loop to check gamepad input
function update() {
  handleInput();
  gameLoop = requestAnimationFrame(update); // Continue the loop
}

// Start the game loop when a gamepad is connected
window.addEventListener('gamepadconnected', (event) => {
  console.log('Gamepad connected:', event.gamepad);
  if (!gameLoop) {
    update();
  }
});

// Stop the game loop when the gamepad is disconnected
window.addEventListener('gamepaddisconnected', (event) => {
  console.log('Gamepad disconnected:', event.gamepad);
  cancelAnimationFrame(gameLoop);
  gameLoop = null;
});
