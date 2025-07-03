import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <>
      <Helmet>
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://flag-fiesta.vercel.app/icon.png" />
        <meta name="fc:frame:post_url" content="https://flag-fiesta.vercel.app/api/frame" />
        <meta name="fc:frame:button:1" content="Play Now" />
        <title>FlagFiesta</title>
      </Helmet>
      <canvas
        id="game"
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
          touchAction: "none",
          background: "#ffffff"
        }}
      />
      <button id="playAgain" style={{
        display: "none",
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "10px 20px",
        fontSize: "18px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px"
      }}>
        Play Again
      </button>
    </>
  );
};

export default App;
