import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Game logic
window.onload = () => {
  const canvas = document.getElementById('game') as HTMLCanvasElement | null;
  if (!canvas) return;

  // Dynamic size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  interface FallingObject {
    x: number;
    y: number;
    type: 'flag' | 'bomb';
  }

  let flags: FallingObject[] = [];
  let bombs: FallingObject[] = [];
  let basketX = canvas.width / 2 - 50;
  const basketWidth = 100;
  let score = 0;
  let startTime = Date.now();

  const spawnObject = (type: 'flag' | 'bomb') => {
    const x = Math.random() * (canvas.width - 20);
    const obj: FallingObject = { x, y: 0, type };
    (type === 'flag' ? flags : bombs).push(obj);
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Basket
    ctx.fillStyle = 'brown';
    ctx.fillRect(basketX, canvas.height - 30, basketWidth, 20);

    // Flags
    ctx.fillStyle = 'blue';
    flags.forEach(flag => {
      flag.y += 3;
      ctx.fillRect(flag.x, flag.y, 20, 20);
    });

    // Bombs
    ctx.fillStyle = 'red';
    bombs.forEach(bomb => {
      bomb.y += 4;
      ctx.beginPath();
      ctx.arc(bomb.x + 10, bomb.y + 10, 10, 0, Math.PI * 2);
      ctx.fill();
    });

    // Collisions
    flags = flags.filter(flag => {
      const caught = flag.y > canvas.height - 50 && flag.x > basketX && flag.x < basketX + basketWidth;
      if (caught) score += 1;
      return !caught && flag.y < canvas.height;
    });

    bombs = bombs.filter(bomb => {
      const hit = bomb.y > canvas.height - 50 && bomb.x > basketX && bomb.x < basketX + basketWidth;
      if (hit) score = 0;
      return !hit && bomb.y < canvas.height;
    });

    // Score
    ctx.fillStyle = 'black';
    ctx.font = '16px sans-serif';
    ctx.fillText(`Score: ${score}`, 10, 20);
  };

  // Desktop mouse move
  document.addEventListener('mousemove', (e) => {
    basketX = e.clientX - canvas.getBoundingClientRect().left - basketWidth / 2;
  });

  // Mobile touch move
  canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    basketX = touch.clientX - canvas.getBoundingClientRect().left - basketWidth / 2;
  });

  const loop = () => {
    if (Date.now() - startTime < 30000) {
      draw();
      if (Math.random() < 0.03) spawnObject('flag');
      if (Math.random() < 0.01) spawnObject('bomb');
      requestAnimationFrame(loop);
    } else {
      ctx.fillStyle = 'black';
      ctx.font = '20px sans-serif';
      ctx.fillText(`Game Over! Final Score: ${score}`, canvas.width / 2 - 100, canvas.height / 2);
    }
  };

  loop();
};
