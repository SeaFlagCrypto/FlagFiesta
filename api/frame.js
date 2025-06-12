export default function handler(req, res) {
  return res.status(200).json({
    frames: [
      {
        version: "vNext",
        image: "https://flag-fiesta.vercel.app/icon.png",
        post_url: "https://flag-fiesta.vercel.app/api/frame",
        buttons: [{ label: "Play Again" }]
      }
    ]
  });
}
