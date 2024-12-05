import './globals.css';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { cn } from '@/lib/utils';

const rubik = Rubik({ 
  subsets: ['latin', 'hebrew'],
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'יוסף חיים לומד גמרא',
  description: 'יוסף חיים לומד גמרא - אפליקציה אינטראקטיבית ללימוד גמרא בדרך חווייתית ומהנה',
  keywords: ['גמרא', 'לימוד', 'תלמוד', 'יהדות', 'חינוך', 'בבא מציעא'],
  authors: [{ name: 'יוסף חיים בן חמו' }],
  openGraph: {
    title: 'יוסף חיים לומד גמרא',
    description: 'יוסף חיים לומד גמרא - אפליקציה אינטראקטיבית ללימוד גמרא בדרך חווייתית ומהנה',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={cn(
        rubik.variable,
        "font-sans bg-gradient-to-b from-blue-50 to-white min-h-screen"
      )}>
        {children}
      </body>
    </html>
  );
}