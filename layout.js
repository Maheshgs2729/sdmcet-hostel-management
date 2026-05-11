import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'SDMCET Hostel Management System',
  description: 'SDM College of Engineering and Technology, Dharwad - Hostel Management System. Role-based dashboards for students, wardens, management, and accountants.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans bg-[#F8F9FA] text-[#2C3E50] antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
