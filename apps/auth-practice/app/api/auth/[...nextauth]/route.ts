import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  // jwt: {
  //   secret: process.env.JWT_SECRET!,
  // },
  callbacks: {
    // async session(session: any, user: any) {
    //   session.user = user;
    //   return session;
    // },
    // async jwt(token: any, user: any, account: any, profile: any, isNewUser: any) {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
  },
  secret: 'top-secret-123',
  jwt: {
    // strategy: 'database',
  },
  session: {
    strategy: 'database',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    // generateSessionToken: () => {
    // return randomUUID?.() ?? randomBytes(32).toString('hex');
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
