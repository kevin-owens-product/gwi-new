import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GWI Growth Platform',
  description: '4-Pillar Growth Platform for 23x MAU Growth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
