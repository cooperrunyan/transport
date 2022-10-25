import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeContextProvider } from '../components/ThemeContext';

import '../style/base.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div id="app">
      <ThemeContextProvider>
        <Head>
          <title>Transport</title>
          <link id="favicon" rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </div>
  );
};

export default App;
