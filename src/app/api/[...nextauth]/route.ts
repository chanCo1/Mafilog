/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.16 ~
 * @description: NextAuth 설정
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import AuthService from '@/features/auth/services/AuthService';
import { getTokenExpire } from '@/shared/lib/utils';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'RememeberMe', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 입력해주세요');
        }

        const email = credentials.email as string;
        const password = credentials.password as string;
        const rememberMe = credentials.rememberMe === 'true';

        try {
          const response = await AuthService.postLogin({
            email,
            password,
            rememberMe,
          });

          const _userInfo = response;

          if (!_userInfo || !_userInfo.user) {
            return null;
          }
          return {
            id: _userInfo.user.id,
            email: _userInfo.user.email,
            name: _userInfo.user.name,
            accessToken: _userInfo.user.accessToken,
            imageURL: _userInfo.user.imageURL,
            rememberMe,
          };
        } catch (error: any) {
          const serverMessage = error.response?.data?.message;
          console.log(`${serverMessage || '인증 실패'}`);

          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 1 * 24 * 60 * 60 },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).accessToken;
        token.imageURL = (user as any).imageURL;

        const isRememberMe = (user as any).rememberMe;

        if (isRememberMe) {
          token.exp = getTokenExpire(30);
        } else {
          token.exp = getTokenExpire();
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session as any).accessToken = token.accessToken;
        (session.user as any).imageURL = token.imageURL;
      }
      return session;
    },
  },
});

export const { GET, POST } = handlers;
