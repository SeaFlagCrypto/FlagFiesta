import { sdk } from '@farcaster/frame-sdk';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // make sure path is correct

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let basketX = canvas.width/2, score = 0, flags = [], bombs = [];
let startTime;

sdk.actions.ready().then(startGame);

function startGame() {
  startTime = Date.now();
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  const elapsed = (Date.now() - startTime) / 1000;
  if (elapsed >= 30) return endGame();
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function update() {
  if (Math.random() < 0.02) flags.push({ x: Math.random()*(canvas.width-20), y: 0 });
  if (Math.random() < 0.01) bombs.push({ x: Math.random()*(canvas.width-20), y: 0 });
  flags.forEach(f => f.y += 2);
  bombs.forEach(b => b.y += 3);
  checkCollisions();
}

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  basketX = e.clientX - rect.left - 40; // center on mouse
});

function checkCollisions() {
  flags = flags.filter(f => {
    if (f.y > canvas.height - 20 && f.x > basketX && f.x < basketX+80) {
      score++;
      document.getElementById('score').textContent = `Score: ${score}`;
      return false;
    }
    return f.y < canvas.height;
  });
  bombs = bombs.filter(b => {
    if (b.y > canvas.height - 20 && b.x > basketX && b.x < basketX+80) {
      score = 0; 
      document.getElementById('score').textContent = `Score: ${score}`;
      return false;
    }
    return b.y < canvas.height;
  });
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  flags.forEach(f => { ctx.fillStyle='blue'; ctx.fillRect(f.x,f.y,20,20); });
  bombs.forEach(b => { ctx.fillStyle='red'; ctx.beginPath(); ctx.arc(b.x+10,b.y+10,10,0,2*Math.PI); ctx.fill(); });
  ctx.fillStyle='black';
  ctx.fillRect(basketX, canvas.height-20, 80, 20);
}

function endGame() {
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '24px sans-serif';
  ctx.fillText(`Time’s up! Final: ${score}`, 40, canvas.height/2);
}


