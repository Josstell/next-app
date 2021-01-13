// import App from 'next/app'
import Link from "next/link";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Link href="/">
        <a>inicio</a>
      </Link>
      <Link href="/about">
        <a>about</a>
      </Link>

      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
