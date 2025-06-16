import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <>
      <Helmet>
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://flag-fiesta.vercel.app/icon.png" />
        <meta name="fc:frame:post_url" content="https://flag-fiesta.vercel.app/api/frame" />
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
    </>
  );
};

export default App;
