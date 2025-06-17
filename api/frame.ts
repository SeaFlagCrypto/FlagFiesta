import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const isInitialRequest = req.method === 'GET' || !req.body || Object.keys(req.body).length === 0;

  if (isInitialRequest) {
    // Frame JSON: shown in Farcaster feed with image + button
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      version: "vNext",
      image: "https://flag-fiesta.vercel.app/icon.png",
      post_url: "https://flag-fiesta.vercel.app/api/frame",
      buttons: [{ label: "Play Now" }]
    });
  } else {
    // HTML game page: shown when user clicks "Play Now"
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <title>FlagFiesta</title>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              background: #181818;
            }
            canvas#game {
              width: 100vw;
              height: 100vh;
              display: block;
              touch-action: none;
            }
            #playAgain {
              display: none;
              position: absolute;
              top: 60%;
              left: 50%;
              transform: translate(-50%, -50%);
              padding: 10px 20px;
              font-size: 18px;
              background-color: #4CAF50;
              color: white;
              border: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <canvas id="game"></canvas>
          <button id="playAgain">Play Again</button>
          <script type="module" src="/src/main.tsx"></script>
        </body>
      </html>
    `);
  }
}
