import elysisaJwt from "@elysiajs/jwt";

const jwt = elysisaJwt({
	name: "jwt",
	secret: "test",
	exp: "7d",
});

export default jwt;
export type JWTContext = Pick<typeof jwt.decorator, "jwt">;
