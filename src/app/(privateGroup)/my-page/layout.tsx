import MyPageLayout from '@/shared/components/layout/MyPageLayout';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MyPageLayout>{children}</MyPageLayout>;
}
