import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeContextProvider } from '../context/ThemeContext';
import { AuthGuard } from '../context/AuthGuard';

import '../style/base.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <div id="app">
    <ThemeContextProvider>
      <Head>
        <title>Transport</title>
        <link id="favicon" rel="icon" href="/favicon.ico" />
      </Head>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </ThemeContextProvider>
  </div>
);

export default App;
