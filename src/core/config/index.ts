export const config = {
	jwt: {
		secret: process.env.APP_SECRET as string,
		expiresIn: '1d',
	},
	bcrypt: {
		passwordSalt: 8
	}
};
