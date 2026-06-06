import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo App - Manage Your Tasks',
  description: 'A feature-rich todo list application with local storage functionality',
  keywords: 'todo, tasks, productivity, app',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Todo App',
    description: 'A feature-rich todo list application with local storage',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
          {children}
        </div>
      </body>
    </html>
  );
}
