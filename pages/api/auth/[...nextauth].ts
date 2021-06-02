import { NextApiHandler } from "next";
import NextAuth, { CallbacksOptions } from "next-auth";
import Providers from "next-auth/providers";

const providers = [
  Providers.Credentials({
    id: "email-password",
    name: "Credentials",
    type: "credentials",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      // const user = await axios.post('https://myapi.com/login',
      // 	{
      // 		user: {
      // 			password: credentials.password,
      // 			email: credentials.email
      // 		}
      // 	},
      // 	{
      // 		headers: {
      // 			accept: '*/*',
      // 			'Content-Type': 'application/json'
      // 		}
      // 	})
      const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

      console.log(user);
      console.log("user");
      if (user) {
        return user;
      } else {
        return null;
      }
    },
  }),
];

const callbacks: CallbacksOptions = {
  // Getting the JWT token from API response
  async jwt(token, user) {
    console.log("token");
    if (user) {
      token.accessToken = user.token;
    }

    return token;
  },

  async session(session, token) {
    console.log("secret");
    session.accessToken = token.accessToken;
    return session;
  },
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers,
    callbacks,
  });
export default authHandler;
