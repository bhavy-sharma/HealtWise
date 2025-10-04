// app/page.js
import WhatWeDo from '../components/WhatWeDo';
import WhoWeAre from '../components/WhoWeAre';

export default function HomePage() {
  return (
    <main>
      <WhatWeDo />
      <WhoWeAre />
    </main>
  );
}