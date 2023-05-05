import Link from "next/link";

export default function Footer() {
	return (
		<footer className="footer p-10 bg-neutral text-neutral-content">
			<div>
				<span className="footer-title">Services</span>
				<Link className="link link-hover" href="/about#Services">
					Branding
				</Link>
				<Link className="link link-hover" href="/about#Services">
					Design
				</Link>
				<Link className="link link-hover" href="/about#Services">
					Marketing
				</Link>
				<Link className="link link-hover" href="/about#Services">
					Advertisement
				</Link>
			</div>
			<div>
				<span className="footer-title">Company</span>
				<Link className="link link-hover" href="/about">
					About us
				</Link>
				<Link className="link link-hover" href="/about">
					Contact
				</Link>
			</div>
			<div>
				<span className="footer-title">Legal</span>
				<Link className="link link-hover" href="/about#Legal">
					Terms of use
				</Link>
				<Link className="link link-hover" href="/about#Legal">
					Privacy policy
				</Link>
				<Link className="link link-hover" href="/about#Legal">
					Cookie policy
				</Link>
			</div>
		</footer>
	);
}
