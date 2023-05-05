import bcrypt from "bcryptjs";

export function verifyPassword(password, hashedPassword) {
	return bcrypt.compareSync(password, hashedPassword);
}

export function hashPassword(password) {
	return bcrypt.hashSync(password, 14);
}
