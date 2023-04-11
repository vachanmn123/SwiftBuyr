export default function Footer() {
	return (
		<footer className="footer p-10 bg-neutral text-neutral-content">
			<div>
				<span className="footer-title">Services</span>
				<a className="link link-hover" href="/about#Services">
					Branding
				</a>
				<a className="link link-hover" href="/about#Services">
					Design
				</a>
				<a className="link link-hover" href="/about#Services">
					Marketing
				</a>
				<a className="link link-hover" href="/about#Services">
					Advertisement
				</a>
			</div>
			<div>
				<span className="footer-title">Company</span>
				<a className="link link-hover" href="/about">
					About us
				</a>
				<a className="link link-hover" href="/about">
					Contact
				</a>
			</div>
			<div>
				<span className="footer-title">Legal</span>
				<a className="link link-hover" href="/about#Legal">
					Terms of use
				</a>
				<a className="link link-hover" href="/about#Legal">
					Privacy policy
				</a>
				<a className="link link-hover" href="/about#Legal">
					Cookie policy
				</a>
			</div>
		</footer>
	);
}
