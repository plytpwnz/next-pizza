import type { Metadata } from 'next';
import { Header } from '@/shared/components/shared';
import { Suspense } from 'react';

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
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
