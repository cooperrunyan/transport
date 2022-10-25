import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { pallette } from '../config/pallette';

import '../style/base.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    for (const color in pallette) {
      for (const shade in (pallette as any)[color]) {
        document?.documentElement?.style.setProperty(`--${color}-${shade}`, (pallette as any)[color][shade]);
      }
    }
  }, [pallette]);

  return (
    <>
      <Head>
        <title>Transport</title>
      </Head>
      <div id="app">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default App;
