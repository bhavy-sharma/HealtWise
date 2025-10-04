'use client';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </AuthProvider>
  );
}
