import Head from "next/head";
import Link from "next/link";
import "../css/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>SwiftBuyr</title>
			</Head>

			<div className="grid wrapper">
				<Component {...pageProps} />
			</div>
		</>
	);
}

export default MyApp;
