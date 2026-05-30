import type { Metadata, Viewport } from 'next';
import { Akaya_Telivigala } from 'next/font/google';
import '@/shared/styles/globals.css';
import DefaultLayout from '@/shared/components/layout/DefaultLayout';
import Providers from '@/shared/components/Providers';
import { auth } from '@/app/api/[...nextauth]/route';


/** 로고용 폰트 */
const fontAkaya = Akaya_Telivigala({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-akaya',
});

/** 뷰포트 설정 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // 사용자 확대 제한
  userScalable: false,
};

export const metadata: Metadata = {
  title: '매필로그: Mafilog',
  description: '지도에 색칠하듯 기록하기 쉬운 여행',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mafilog',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  formatDetection: {
    telephone: false, // 숫자 클릭 시 전화걸기 팝업 방지
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ko" className={fontAkaya.variable}>
      <body className="flex flex-col">
        <Providers session={session}>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
