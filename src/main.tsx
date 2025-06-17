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

  let score = 0;
  let startTime: number;
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
    ctx.font = "24px Arial";
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
      flags.push({ x: Math.random() * (canvas.width - 30), y: 0 });
    }

    if (Math.random() < 0.02) {
      bombs.push({ x: Math.random() * (canvas.width - 30), y: 0 });
    }

    flags.forEach((flag) => (flag.y += 3));
    bombs.forEach((bomb) => (bomb.y += 4));
  }

  function handleTap(x: number, y: number) {
    for (let i = flags.length - 1; i >= 0; i--) {
      const flag = flags[i];
      if (
        x >= flag.x &&
        x <= flag.x + 30 &&
        y >= flag.y &&
        y <= flag.y + 30
      ) {
        flags.splice(i, 1);
        score++;
        return;
      }
    }

    for (let i = bombs.length - 1; i >= 0; i--) {
      const bomb = bombs[i];
      const dx = x - (bomb.x + 15);
      const dy = y - (bomb.y + 15);
      if (Math.sqrt(dx * dx + dy * dy) <= 15) {
        bombs.splice(i, 1);
        score = 0;
        return;
      }
    }
  }

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    handleTap(e.clientX - rect.left, e.clientY - rect.top);
  });

  canvas.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    handleTap(touch.clientX - rect.left, touch.clientY - rect.top);
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
