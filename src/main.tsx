import { sdk } from "@farcaster/miniapp-sdk";

window.addEventListener("DOMContentLoaded", async () => {
  await sdk.actions.ready();

  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement | null;
  const playAgainBtn = document.getElementById("playAgainBtn") as HTMLButtonElement | null;

  if (!canvas || !playAgainBtn) {
    console.error("Canvas or Play Again button not found");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get canvas rendering context");
    return;
  }

  let score = 0;
  let isGameOver = false;

  function drawFlag(x: number, y: number) {
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, 30, 20);
  }

  function drawBomb(x: number, y: number) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  function gameOver() {
    isGameOver = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 75, canvas.height / 2);
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 50, canvas.height / 2 + 40);
    playAgainBtn.style.display = "block";
  }

  function startGame() {
    score = 0;
    isGameOver = false;
    playAgainBtn.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const flags = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      speed: Math.random() * 3 + 1,
    }));

    const bomb = {
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      speed: Math.random() * 3 + 2,
    };

    function draw() {
      if (isGameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flags.forEach((flag) => {
        drawFlag(flag.x, flag.y);
        flag.y += flag.speed;

        if (flag.y > canvas.height) {
          flag.y = 0;
          flag.x = Math.random() * canvas.width;
        }
      });

      drawBomb(bomb.x, bomb.y);
      bomb.y += bomb.speed;

      if (bomb.y > canvas.height) {
        bomb.y = 0;
        bomb.x = Math.random() * canvas.width;
      }

      requestAnimationFrame(draw);
    }

    canvas.onclick = (e: MouseEvent) => {
      if (isGameOver) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (const flag of flags) {
        if (x >= flag.x && x <= flag.x + 30 && y >= flag.y && y <= flag.y + 20) {
          score += 1;
          flag.y = 0;
          flag.x = Math.random() * canvas.width;
        }
      }

      if (x >= bomb.x - 10 && x <= bomb.x + 10 && y >= bomb.y - 10 && y <= bomb.y + 10) {
        gameOver();
      }
    };

    draw();
  }

  playAgainBtn.onclick = startGame;
  startGame();
});
