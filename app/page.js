import Header from '@/components/Header';
<<<<<<< HEAD
import WhatWeDo from '../components/WhatWeDo';
import WhoWeAre from '../components/WhoWeAre';
import Footer from '@/components/Footer';
=======
import WhatWeDo from '@/components/WhatWeDo';
import WhoWeAre from '@/components/WhoWeAre';
import WowHeroSection from '@/components/WowHeroSection';
>>>>>>> d53a116aac54824a284cba90c666ed882daa7b9b

export default function HomePage() {
  return (
    <main>
      <Header />
      <WowHeroSection />
      <WhatWeDo />
      <WhoWeAre />
      <Footer />
    </main>
  );
}