import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    image: "https://flag-fiesta.vercel.app/icon.png",
    post_url: "https://flag-fiesta.vercel.app/api/frame",
    buttons: [
      { label: "Play Now" }
    ]
  });
}
