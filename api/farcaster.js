export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    frame: {
      version: "1",
      name: "FlagFiesta",
      icon: "https://flag-fiesta.vercel.app/icon.png",
      postUrl: "https://flag-fiesta.vercel.app/api/frame",
      buttonTitle: "Play Now"
    },
    embed: {
      type: "miniapp",
      url: "https://flag-fiesta.vercel.app",
      version: "vNext"
    }
  });
}
