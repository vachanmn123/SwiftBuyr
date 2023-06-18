import Head from "next/head";
import Link from "next/link";
import "../css/globals.css";
import Cookies from "js-cookie";
import dbConnect from "../lib/dbConnect";
import { SessionProvider } from "next-auth/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const cart = Cookies.get("cart");
	useEffect(async () => {
		if (!cart) {
			const res = await fetch("/api/createCart");
			const cartID = await res.json();
			Cookies.set("cart", cartID.data);
		}
	}, [cart]);
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
