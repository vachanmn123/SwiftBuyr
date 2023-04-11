import { Html, Head, Main, NextScript } from "next/document";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<NavBar />
				<Main />
				<Footer />
				<NextScript />
			</body>
		</Html>
	);
}
