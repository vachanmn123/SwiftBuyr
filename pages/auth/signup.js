import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Signup() {
	const [error, setError] = useState(null);
	const [signingUp, setSigningUp] = useState(false);
	const [signingIn, setSigningIn] = useState(false);

	const session = useSession();
	const router = useRouter();
	const nextUrl = router.query.next || "/";

	useEffect(() => {
		if (session.status === "authenticated") {
			router.push(nextUrl);
		}
	}, [session.status]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { name, email, password } = event.target;
		setSigningUp(true);
		const res = await fetch("/api/auth/signup", {
			method: "POST",
			body: JSON.stringify({
				name: name.value,
				email: email.value,
				password: password.value,
			}),
		});
		if (res.status !== 200) {
			setError((await res.json()).message);
			setSigningUp(false);
			return;
		}

		setSigningIn(true);
		setSigningUp(false);
		const signInRes = await signIn("credentials", {
			redirect: false,
			email: email.value,
			password: password.value,
		});
		if (!signInRes.ok) {
			setSigningIn(false);
			setError(signInRes.error);
			return;
		}
		router.push(nextUrl);
	};
	if (signingUp) {
		return (
			<div className="relative flex flex-col justify-center h-screen overflow-hidden">
				<div className="w-full p-6 m-auto bg-gray-800 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
					<h1 className="text-3xl font-semibold text-center text-white pt-2">
						Signing you up
					</h1>
				</div>
			</div>
		);
	}
	if (signingIn) {
		return (
			<div className="relative flex flex-col justify-center h-screen overflow-hidden">
				<div className="w-full p-6 m-auto bg-gray-800 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
					<h1 className="text-3xl font-semibold text-center text-white pt-2">
						Signing you in
					</h1>
				</div>
			</div>
		);
	}
	return (
		<div className="relative flex flex-col justify-center h-screen overflow-hidden">
			<div className="w-full p-6 m-auto bg-gray-800 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
				<h1 className="text-3xl font-semibold text-center text-white pt-2">
					Sign Up
				</h1>
				{error && <p className="error">{error}</p>}
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="name" className="label">
							Full name
						</label>
						<input
							name="name"
							type="text"
							className="w-full input input-bordered"
							placeholder="Enter your full name"
							required
						/>
					</div>
					<div>
						<label htmlFor="email" className="label">
							Email
						</label>
						<input
							name="email"
							type="email"
							className="w-full input input-bordered"
							placeholder="Enter your email"
							required
						/>
					</div>
					<div>
						<label htmlFor="password" className="label">
							Password
						</label>
						<input
							name="password"
							type="password"
							className="w-full input input-bordered"
							placeholder="Enter your password"
							minLength={8}
							required
						/>
					</div>
					<div>
						<p>
							Already have an account?{" "}
							<Link
								href={`/auth/login?next=${nextUrl}`}
								className="link"
							>
								Login
							</Link>
						</p>
					</div>
					<button
						type="submit"
						disabled={signingUp}
						className="btn btn-block"
					>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
}
