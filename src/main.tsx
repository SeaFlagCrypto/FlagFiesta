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
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;
  });

  let score = 0;
  let startTime: number;
  const flags: { x: number; y: number }[] = [];
  const bombs: { x: number; y: number }[] = [];

  canvas!.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const clickX = touch.clientX - canvas!.getBoundingClientRect().left;
    const clickY = touch.clientY - canvas!.getBoundingClientRect().top;

    for (let i = flags.length - 1; i >= 0; i--) {
      const f = flags[i];
      if (clickX >= f.x && clickX <= f.x + 20 && clickY >= f.y && clickY <= f.y + 20) {
        flags.splice(i, 1);
        score++;
        return;
      }
    }

    for (let i = bombs.length - 1; i >= 0; i--) {
      const b = bombs[i];
      if (clickX >= b.x && clickX <= b.x + 20 && clickY >= b.y && clickY <= b.y + 20) {
        bombs.splice(i, 1);
        score = 0;
        return;
      }
    }
  });

  function drawFlags() {
    ctx!.fillStyle = "green";
    flags.forEach((flag) => {
      ctx!.fillRect(flag.x, flag.y, 20, 20);
    });
  }

  function drawBombs() {
    ctx!.fillStyle = "red";
    bombs.forEach((bomb) => {
      ctx!.beginPath();
      ctx!.arc(bomb.x + 10, bomb.y + 10, 10, 0, Math.PI * 2);
      ctx!.fill();
    });
  }

  function drawScore() {
    ctx!.fillStyle = "white";
    ctx!.font = "20px Arial";
    ctx!.fillText(`Score: ${score}`, 10, 30);
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
      flags.push({ x: Math.random() * (canvas!.width - 20), y: 0 });
    }

    if (Math.random() < 0.02) {
      bombs.push({ x: Math.random() * (canvas!.width - 20), y: 0 });
    }

    flags.forEach((flag) => (flag.y += 3));
    bombs.forEach((bomb) => (bomb.y += 4));
  }

  function draw() {
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
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
