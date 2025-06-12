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

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  interface FallingObject {
    x: number;
    y: number;
    type: 'flag' | 'bomb';
  }

  let flags: FallingObject[] = [];
  let bombs: FallingObject[] = [];
  let basketX = 350;
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

    // Draw basket
    ctx.fillStyle = 'brown';
    ctx.fillRect(basketX, canvas.height - 30, basketWidth, 20);

    // Draw flags
    ctx.fillStyle = 'blue';
    flags.forEach(flag => {
      flag.y += 3;
      ctx.fillRect(flag.x, flag.y, 20, 20);
    });

    // Draw bombs
    ctx.fillStyle = 'red';
    bombs.forEach(bomb => {
      bomb.y += 4;
      ctx.beginPath();
      ctx.arc(bomb.x + 10, bomb.y + 10, 10, 0, Math.PI * 2);
      ctx.fill();
    });

    // Check for collisions
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
    ctx.fillText(`Score: ${score}`, 10, 20);
  };

  document.addEventListener('mousemove', (e) => {
    basketX = e.clientX - canvas.getBoundingClientRect().left - basketWidth / 2;
  });

  const loop = () => {
    if (Date.now() - startTime < 30000) {
      draw();
      if (Math.random() < 0.03) spawnObject('flag');
      if (Math.random() < 0.01) spawnObject('bomb');
      requestAnimationFrame(loop);
    } else {
      ctx.fillStyle = 'black';
      ctx.fillText(`Game Over! Final Score: ${score}`, 300, 300);
    }
  };

  loop();
};
