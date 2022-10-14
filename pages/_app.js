import '@fontsource/poppins';
import Head from 'next/head';
import LogRocket from 'logrocket';
import '../styles/styles.css';

export default function MyApp({ Component, pageProps }) {
  // LogRocket.init('h5fprr/frost-education');
  return (
    <>
      <Head>
        <link href="/favicon-rounded.png" rel="icon" type="image/png" />
        <meta content="Frost Education*" key="title" property="og:title" />
        <title>Frost Education*</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
