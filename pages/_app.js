import Head from "next/head";
import Link from "next/link";
import "../css/globals.css";
import dbConnect from "../lib/dbConnect";
import { SessionProvider } from "next-auth/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Head>
				<title>SwiftBuyr</title>
			</Head>

			<div className="grid wrapper">
				<NavBar />
				<Component {...pageProps} />
				<Footer />
			</div>
		</SessionProvider>
	);
}

export async function getServerSideProps() {
	await dbConnect();
	return { props: {} };
}

export default MyApp;
