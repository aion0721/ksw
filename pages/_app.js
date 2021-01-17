import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Link href="/">
        <a>Go to Home</a>
      </Link>
      <br />
      <Link href="/guest/input">
        <a>Goto input info</a>
      </Link>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
