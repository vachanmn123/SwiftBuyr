import {
	getProviders,
	signIn,
	getSession,
	getCsrfToken,
	useSession,
} from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login({ providers, csrf }) {
	const router = useRouter();
	const next = router.query.next || "/";
	const { data: session, status: authStatus } = useSession();
	if (authStatus === "authenticated") {
		console.log(session);
		router.push(next);
	}

	const [signingIn, seetSigningIn] = useState(false);
	const [error, setError] = useState(null);
	/**
	 *
	 * @param {SubmitEvent} event
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();
		const { csrfToken, email, password } = event.target;
		console.log(csrfToken.value, email.value, password.value);
		seetSigningIn(true);
		const res = await signIn("credentials", {
			redirect: false,
			email: email.value,
			password: password.value,
			csrfToken: csrfToken.value,
			callbackUrl: "/",
		});
		if (res.ok) {
			router.push(next);
		} else {
			seetSigningIn(false);
			setError(res.error);
		}
	};
	if (signingIn) {
		return (
			<div className="relative flex flex-col justify-center h-screen overflow-hidden">
				<div className="w-full p-6 m-auto bg-gray-800 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
					<h1 className="text-3xl font-semibold text-center text-white pt-2">
						Signing In
					</h1>
				</div>
			</div>
		);
	}
	return (
		<div className="relative flex flex-col justify-center h-screen overflow-hidden">
			<div className="w-full p-6 m-auto bg-gray-800 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
				<h1 className="text-3xl font-semibold text-center text-white pt-2">
					Sign In
				</h1>
				{error && <p className="error">{error}</p>}
				<form onSubmit={handleSubmit} className="space-y-4">
					<input type="hidden" name="csrfToken" value={csrf} />
					<div>
						<label htmlFor="email" className="label">
							Email
						</label>
						<input
							name="email"
							type="email"
							className="w-full input input-bordered"
							placeholder="Enter your email"
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
						/>
					</div>
					<button
						type="submit"
						disabled={signingIn}
						className="btn btn-block"
					>
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	return {
		props: {
			providers: await getProviders(),
			csrf: await getCsrfToken(context),
		},
	};
}
