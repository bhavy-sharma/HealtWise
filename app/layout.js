import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Healthwise',
  description: 'Your health companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
