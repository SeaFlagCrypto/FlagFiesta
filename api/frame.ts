import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    version: "vNext",
    image: "https://flag-fiesta.vercel.app/icon.png",
    post_url: "https://flag-fiesta.vercel.app/api/frame",
    buttons: [{ label: "Play Now" }]
  });
}

