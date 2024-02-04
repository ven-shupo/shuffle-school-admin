import Head from 'next/head';
import Script from "next/script";
import Preview from "../components/preview";
import styles from '../styles/Home.module.css';


export default function Home() {
  return (
    <div
      className={styles.app}
      style={{backgroundColor: 'var(--tg-theme-secondary-bg-color)'}}
    >
      <Script
        src="https://ven-shupo.github.io/shuffle-school/tgcl.js"
        strategy="beforeInteractive"
      />
        <Head>
          <title>XXX SHUFFLE</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="icon" href="https://ven-shupo.github.io/shuffle-school/favicon.ico" />
        </Head>
        <Preview/>
    </div>
  );
}
