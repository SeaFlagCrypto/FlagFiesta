import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      version: "vNext",
      image: "https://flag-fiesta.vercel.app/icon.png",
      post_url: "https://flag-fiesta.vercel.app/api/frame",
      buttons: [{ label: "Play Now" }]
    });
  } catch (error) {
    console.error("Error generating frame response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
