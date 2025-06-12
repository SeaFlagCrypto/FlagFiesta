import React from 'react';
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <>
      <Helmet>
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://flag-fiesta.vercel.app/icon.png" />
        <meta name="fc:frame:post_url" content="https://flag-fiesta.vercel.app" />
        <title>FlagFiesta</title>
      </Helmet>

      <h1>Welcome to FlagFiesta!</h1>
      {/* Add your game logic/UI here */}
    </>
  );
};

export default App;
