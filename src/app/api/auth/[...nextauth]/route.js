// src/app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { username },
          include: {
            roles: {
              include: { role: true },
            },
          },
        });

        if (!user) return null;
        if (user.status === 'suspended') return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        const roles = user.roles.map((ur) => ur.role.name); // ['admin', ...]

        return {
          id: user.id,
          name: user.name || user.username,
          email: user.email,
          username: user.username,
          status: user.status,
          roles,
          profileImage: user.profileImage || null,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles || [];
        token.status = user.status;
        token.username = user.username;
        token.profileImage = user.profileImage || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.roles = token.roles || [];
        session.user.status = token.status;
        session.user.username = token.username;
        session.user.profileImage = token.profileImage || null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
