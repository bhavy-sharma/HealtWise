import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import './globals.css';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Healthwise',
  description: 'Your health companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}