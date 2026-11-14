import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'Framework Test — Offensive Focus',
  description: 'arm-next · Next.js 16 static export · the engine-contract UI prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
