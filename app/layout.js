import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import './globals.css';

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
        </AuthProvider>
      </body>
    </html>
  );
}