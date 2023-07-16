import Image from 'next/image';
import HeroBanner from './hero-banner';
import BannerSvg from './banner-svg';

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-between md:flew-row">
        <HeroBanner />
        <BannerSvg
          gearRightClass={'origin-[50%_50%] animate-gear-rotate-left'}
          gearLeftClass={'origin-[50%_50%] animate-gear-rotate-right'}
        />
      </div>
    </main>
  );
}
