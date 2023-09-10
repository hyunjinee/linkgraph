import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentailsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentailsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials) {
        const { id, password } = credentials as any;

        if (id !== 'admin' && password !== 'admin') {
          return null;
          // return Promise.resolve({
          //   id: 1,
          //   name: 'Admin',
          //   email: '',
          // });
        }

        return {
          id: '11',
          name: 'hi',
          email: 'hellow',
        };
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async session({ session }) {
      if (!session.user?.email) {
        return session;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
      });

      session.user.role = user?.role;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
