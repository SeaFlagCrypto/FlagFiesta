export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({
    type: "miniapp",
    url: "https://flag-fiesta.vercel.app",
    version: "vNext"
  });
}
