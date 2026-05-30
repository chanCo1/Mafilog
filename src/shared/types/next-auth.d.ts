import NextAuth, { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      profileImageUrl?: string | null;
      hexCode?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    profileImageUrl?: string | null;
    hexCode?: string | null;
    accessToken?: string;
    rememberMe?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    profileImageUrl?: string | null;
    hexCode?: string | null;
    accessToken?: string;
  }
}
