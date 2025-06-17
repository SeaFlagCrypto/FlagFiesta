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

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const basketWidth = 60;
  const basketHeight = 16;
  let basketX = canvas.width / 2 - basketWidth / 2;
  const basketY = canvas.height - basketHeight - 10;

  let score = 0;
  let startTime: number;
  const flags: { x: number; y: number }[] = [];
  const bombs: { x: number; y: number }[] = [];

  canvas.addEventListener("mousemove", (e) => {
    basketX = e.clientX - canvas.getBoundingClientRect().left - basketWidth / 2;
  });

  canvas.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    basketX = touch.clientX - canvas.getBoundingClientRect().left - basketWidth / 2;
  });

  function drawBasket() {
    ctx.fillStyle = "#3498db";
    ctx.fillRect(basketX, basketY, basketWidth, basketHeight);
  }

  function drawFlags() {
    ctx.fillStyle = "#2ecc71";
    flags.forEach((flag) => {
      ctx.fillRect(flag.x, flag.y, 20, 20);
    });
  }

  function drawBombs() {
    ctx.fillStyle = "#e74c3c";
    bombs.forEach((bomb) => {
      ctx.beginPath();
      ctx.arc(bomb.x + 10, bomb.y + 10, 10, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawScore() {
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial";
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

    if (Math.random() < 0.05) {
      flags.push({ x: Math.random() * (canvas.width - 20), y: 0 });
    }

    if (Math.random() < 0.02) {
      bombs.push({ x: Math.random() * (canvas.width - 20), y: 0 });
    }

    flags.forEach((flag) => flag.y += 3);
    bombs.forEach((bomb) => bomb.y += 4);

    for (let i = flags.length - 1; i >= 0; i--) {
      const flag = flags[i];
      if (
        flag.y + 20 >= basketY &&
        flag.x < basketX + basketWidth &&
        flag.x + 20 > basketX
      ) {
        flags.splice(i, 1);
        score++;
      }
    }

    for (let i = bombs.length - 1; i >= 0; i--) {
      const bomb = bombs[i];
      if (
        bomb.y + 20 >= basketY &&
        bomb.x < basketX + basketWidth &&
        bomb.x + 20 > basketX
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
