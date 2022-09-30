import '@fontsource/poppins';
import Head from 'next/head';
import '../styles/styles.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Frost Education*</title>
        <meta content="Frost Education*" key="title" property="og:title" />
        <link href="/favicon-rounded.png" rel="icon" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
