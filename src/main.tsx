import { sdk } from '@farcaster/miniapp-sdk';

window.addEventListener('load', async () => {
  await sdk.actions.ready();

  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
  const playAgainBtn = document.getElementById('play-again') as HTMLButtonElement | null;

  if (!canvas || !playAgainBtn) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const flags = ['🇺🇸', '🇬🇧', '🇮🇳', '🇫🇷', '🇯🇵', '🇧🇷'];
  const bombs = ['💣'];
  let score = 0;
  let gameOver = false;

  function randomItem(items: string[]) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function drawEmoji(emoji: string, x: number, y: number) {
    ctx.font = '40px Arial';
    ctx.fillText(emoji, x, y);
  }

  function drawScore() {
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
  }

  function drawGameOver() {
    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over!', canvas.width / 2 - 80, canvas.height / 2);
    playAgainBtn.style.display = 'block';
  }

  let items: { emoji: string; x: number; y: number }[] = [];

  function spawnItem() {
    const emoji = Math.random() < 0.8 ? randomItem(flags) : randomItem(bombs);
    const x = Math.random() * canvas.width;
    items.push({ emoji, x, y: 0 });
  }

  function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    items.forEach((item, index) => {
      item.y += 2;
      drawEmoji(item.emoji, item.x, item.y);

      if (item.y > canvas.height) {
        items.splice(index, 1);
      }
    });

    drawScore();
    requestAnimationFrame(update);
  }

  canvas.addEventListener('click', (e) => {
    if (gameOver) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (
        clickX > item.x && clickX < item.x + 40 &&
        clickY > item.y - 40 && clickY < item.y
      ) {
        if (bombs.includes(item.emoji)) {
          gameOver = true;
          drawGameOver();
        } else {
          score++;
          items.splice(i, 1);
        }
        break;
      }
    }
  });

  playAgainBtn.addEventListener('click', () => {
    items = [];
    score = 0;
    gameOver = false;
    playAgainBtn.style.display = 'none';
    update();
  });

  setInterval(spawnItem, 800);
  update();
});
