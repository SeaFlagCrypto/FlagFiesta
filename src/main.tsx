window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("game") as HTMLCanvasElement | null;
  const playAgainBtn = document.getElementById("playAgain") as HTMLButtonElement | null;

  if (!canvas || !playAgainBtn) {
    console.error("Canvas or Play Again button not found!");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("2D context not available!");
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let score = 0;
  let startTime: number;
  let gameEnded = false;
  const flags: { x: number; y: number }[] = [];
  const bombs: { x: number; y: number }[] = [];

  function drawFlags() {
    ctx.fillStyle = "green";
    flags.forEach((flag) => {
      ctx.fillRect(flag.x, flag.y, 30, 30);
    });
  }

  function drawBombs() {
    ctx.fillStyle = "red";
    bombs.forEach((bomb) => {
      ctx.beginPath();
      ctx.arc(bomb.x + 15, bomb.y + 15, 15, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
  }

  function drawResult() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Time's up!`, canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText(`Your Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    playAgainBtn.style.display = "block";
  }

  function resetGame() {
    score = 0;
    flags.length = 0;
    bombs.length = 0;
    gameEnded = false;
    startTime = Date.now();
    playAgainBtn.style.display = "none";
  }

  function updateGame() {
    if (gameEnded) return;

    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed > 30) {
      gameEnded = true;
      drawResult();
      return;
    }

    if (Math.random() < 0.04) {
      flags.push({ x: Math.random() * (canvas.width - 30), y: 0 });
    }

    if (Math.random() < 0.02) {
      bombs.push({ x: Math.random() * (canvas.width - 30), y: 0 });
    }

    flags.forEach((flag) => flag.y += 3);
    bombs.forEach((bomb) => bomb.y += 4);
  }

  function draw() {
    if (gameEnded) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFlags();
    drawBombs();
    drawScore();
  }

  canvas.addEventListener("touchstart", (e) => {
    if (gameEnded) return;

    const touch = e.touches[0];
    const touchX = touch.clientX - canvas.getBoundingClientRect().left;
    const touchY = touch.clientY - canvas.getBoundingClientRect().top;

    for (let i = flags.length - 1; i >= 0; i--) {
      const flag = flags[i];
      if (
        touchX >= flag.x &&
        touchX <= flag.x + 30 &&
        touchY >= flag.y &&
        touchY <= flag.y + 30
      ) {
        flags.splice(i, 1);
        score++;
        return;
      }
    }

    for (let i = bombs.length - 1; i >= 0; i--) {
      const bomb = bombs[i];
      if (
        touchX >= bomb.x &&
        touchX <= bomb.x + 30 &&
        touchY >= bomb.y &&
        touchY <= bomb.y + 30
      ) {
        bombs.splice(i, 1);
        score = 0;
        return;
      }
    }
  });

  playAgainBtn.addEventListener("click", () => {
    resetGame();
    requestAnimationFrame(gameLoop);
  });

  function gameLoop() {
    updateGame();
    draw();
    if (!gameEnded) requestAnimationFrame(gameLoop);
  }

  resetGame();
  gameLoop();
});
