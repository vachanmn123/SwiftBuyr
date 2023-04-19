import Head from "next/head";
import Link from "next/link";
import "../css/globals.css";
import dbConnect from "../lib/dbConnect";

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

export async function getServerSideProps() {
	await dbConnect();
	return { props: {} };
}

export default MyApp;
