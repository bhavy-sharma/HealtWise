import Header from '@/components/Header';
import WhatWeDo from '@/components/WhatWeDo';
import WhoWeAre from '@/components/WhoWeAre';
import WowHeroSection from '@/components/WowHeroSection';

export default function HomePage() {
  return (
    <main>
      <Header />
      <WowHeroSection />
      <WhatWeDo />
      <WhoWeAre />
    </main>
  );
}