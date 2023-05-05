import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbConnect";
import UserSchema from "../../../models/User";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "john@doe.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const db = await dbConnect();
				const user = await UserSchema.findOne({
					email: credentials.email,
				});
				if (!user) {
					throw new Error("Wrong Email/Password");
				}
				const isValid = verifyPassword(
					credentials.password,
					user.password
				);
				if (!isValid) {
					throw new Error("Wrong Email/Password");
				}
				return JSON.parse(JSON.stringify(user));
			},
			pages: {
				signIn: "/auth/login",
			},
		}),
	],
});
