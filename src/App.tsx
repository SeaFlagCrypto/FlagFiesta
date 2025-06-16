import { Helmet } from 'react-helmet';

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://flag-fiesta.vercel.app/icon.png" />
        <meta name="fc:frame:post_url" content="https://flag-fiesta.vercel.app/api/frame" />
        <meta property="og:title" content="FlagFiesta" />
        <meta property="og:image" content="https://flag-fiesta.vercel.app/icon.png" />
        <title>FlagFiesta</title>
      </Helmet>
      <canvas
        id="game"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
          touchAction: 'none',
        }}
      />
    </>
  );
};

export default App;
