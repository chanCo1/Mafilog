/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.16 ~
 * @description: NextAuth 설정
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import AuthService from '@/features/auth/services/AuthService';
import { ILoginRequest } from '@/features/auth/interfaces/register.interface';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // 로그인 요청 시 전달받을 값의 타입을 정의합니다.
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // 💡 실제 로그인 검증 로직
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 입력해주세요');
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          const response = await AuthService.postLogin({
            email,
            password,
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
  // 세션 전략을 JWT로 설정
  session: { strategy: 'jwt' },
  // 커스텀 로그인 페이지 지정 (원하는 경로로 수정 가능)
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // JWT 토큰에 유저 정보 담기
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).accessToken;
        token.imageURL = (user as any).imageURL;
      }
      return token;
    },
    // 클라이언트 컴포넌트에서 useSession()으로 꺼내 쓸 세션 정보
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
