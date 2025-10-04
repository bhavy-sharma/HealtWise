import Header from '@/components/Header';
import WhatWeDo from '@/components/WhatWeDo';
import WhoWeAre from '@/components/WhoWeAre';
import WowHeroSection from '@/components/WowHeroSection';
import Footer from '@/components/Footer';
import DisclaimerButtonSection from '@/components/DisclaimerButtonSection';
export default function HomePage() {
  return (
    <main>
      {/* <Header /> */}
      <WowHeroSection />
      <WhatWeDo />
      <DisclaimerButtonSection />
      <WhoWeAre />
      {/* <Footer /> */}
    </main>
  );
}