import Header from '@/components/Header';
import WhatWeDo from '../components/WhatWeDo';
import WhoWeAre from '../components/WhoWeAre';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main>
      <Header />
      <WhatWeDo />
      <WhoWeAre />
      <Footer />
    </main>
  );
}