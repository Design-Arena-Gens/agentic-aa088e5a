import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '????? ??????? ????? - ???? ??????',
  description: '?????? ????? ??????? ???????? ?? ????? ??? ??????? ???????? ????????.',
  metadataBase: new URL('https://agentic-aa088e5a.vercel.app')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <header className="border-b border-gray-200/70 dark:border-[#121820] sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-[#0b0f13]/70">
          <div className="container-narrow flex items-center justify-between py-4">
            <Link href="/" className="text-lg font-semibold">????? ???????</Link>
            <nav className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <Link href="/" className="hover:opacity-80">??????</Link>
              <a href="https://www.shopify.com/" target="_blank" rel="noreferrer" className="hover:opacity-80">???????</a>
            </nav>
          </div>
        </header>
        <main className="container-narrow py-10">{children}</main>
        <footer className="container-narrow py-10 text-center text-sm text-gray-500">? {new Date().getFullYear()} ????? ??????? ?????</footer>
      </body>
    </html>
  );
}
