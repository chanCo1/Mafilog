import type { Metadata } from 'next';
import '@/shared/styles/globals.css';

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
    <html
      lang="ko"
    >
      <body className="flex flex-col">{children}</body>
    </html>
  );
}
