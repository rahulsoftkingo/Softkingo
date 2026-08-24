// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { username, password } = credentials;
          const user = await prisma.user.findUnique({
            where: { username },
            include: {
              roles: {
                include: { role: true },
              },
            },
          });

          if (!user || user.status === 'suspended') return null;
          const isValid = await bcrypt.compare(password, user.passwordHash);
          if (!isValid) return null;

          const roles = user.roles.map((ur) => ur.role.name);

          return {
            id: user.id.toString(),
            name: user.name || user.username,
            email: user.email,
            username: user.username,
            status: user.status,
            roles,
            profileImage: user.profileImage || null,
            image: user.profileImage || null,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: { 
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles || [];
        token.status = user.status;
        token.username = user.username;
        token.profileImage = user.profileImage;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.roles = token.roles || [];
        session.user.status = token.status;
        session.user.username = token.username;
        session.user.profileImage = token.profileImage;
        session.user.image = token.profileImage;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ CORRECT WAY - NextAuth v5 official pattern [web:1461][web:1466]
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
