import type { Metadata } from 'next';
import { Bona_Nova_SC } from 'next/font/google';
import '@/shared/styles/globals.css';
import DefaultLayout from '@/shared/components/layout/DefaultLayout';

/** 로고용 폰트 */
const fontBonaNova = Bona_Nova_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-bona-nova-sc'
})

export const metadata: Metadata = {
  title: '매필로그: Mafilog',
  description: '지도에 색칠하듯 기록하기 쉬운 여행',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={fontBonaNova.variable}>
      <body className="flex flex-col">
        <DefaultLayout>
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}
