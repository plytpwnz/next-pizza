export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      Dashboard
      <body>{children}</body>
    </html>
  );
}
