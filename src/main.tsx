window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("game") as HTMLCanvasElement | null;
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("2D context not available!");
    return;
  }

  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const basketWidth = 80;
  const basketHeight = 20;
  let basketX = canvas.width / 2 - basketWidth / 2;
  const basketY = canvas.height - basketHeight - 10;

  let score = 0;
  let startTime: number;
  const flags: { x: number; y: number }[] = [];
  const bombs: { x: number; y: number }[] = [];

  // Input support (mouse + touch)
  canvas.addEventListener("mousemove", (e) => {
    basketX = e.clientX - canvas.getBoundingClientRect().left - basketWidth / 2;
  });

  canvas.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    basketX = touch.clientX - canvas.getBoundingClientRect().left - basketWidth / 2;
  });

  function drawBasket() {
    ctx.fillStyle = "blue";
    ctx.fillRect(basketX, basketY, basketWidth, basketHeight);
  }

  function drawFlags() {
    ctx.fillStyle = "green";
    for (const flag of flags) {
      ctx.fillRect(flag.x, flag.y, 20, 20);
    }
  }

  function drawBombs() {
    ctx.fillStyle = "red";
    for (const bomb of bombs) {
      ctx.beginPath();
      ctx.arc(bomb.x + 10, bomb.y + 10, 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
  }

  function resetGame() {
    score = 0;
    flags.length = 0;
    bombs.length = 0;
    startTime = Date.now();
  }

  function updateGame() {
    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed > 30) return;

    // Add new flags and bombs
    if (Math.random() < 0.05) {
      flags.push({ x: Math.random() * (canvas.width - 20), y: 0 });
    }

    if (Math.random() < 0.02) {
      bombs.push({ x: Math.random() * (canvas.width - 20), y: 0 });
    }

    // Update positions
    for (const flag of flags) flag.y += 3;
    for (const bomb of bombs) bomb.y += 4;

    // Check collisions
    for (let i = flags.length - 1; i >= 0; i--) {
      if (
        flags[i].y + 20 >= basketY &&
        flags[i].x < basketX + basketWidth &&
        flags[i].x + 20 > basketX
      ) {
        flags.splice(i, 1);
        score++;
      }
    }

    for (let i = bombs.length - 1; i >= 0; i--) {
      if (
        bombs[i].y + 20 >= basketY &&
        bombs[i].x < basketX + basketWidth &&
        bombs[i].x + 20 > basketX
      ) {
        bombs.splice(i, 1);
        score = 0;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawFlags();
    drawBombs();
    drawScore();
  }

  function gameLoop() {
    updateGame();
    draw();
    requestAnimationFrame(gameLoop);
  }

  resetGame();
  gameLoop();
});
