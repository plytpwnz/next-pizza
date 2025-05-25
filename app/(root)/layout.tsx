import type { Metadata } from 'next';
import { Header } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Next Pizza',
  description: 'The best Pizzeria',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-sreen">
      <Header />
      {children}
    </main>
  );
}
