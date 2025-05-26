import type { Metadata } from 'next';
import { Header } from '@/shared/components/shared';

export const metadata: Metadata = {
  title: 'Next Pizza',
  description: 'The best Pizzeria',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-sreen">
      <Header />
      {children}
      {modal}
    </main>
  );
}
