import Hero from '@/components/home/Hero'
import Header from '@/components/layout/Header'
import IntroSection from '@/components/home/IntroSection'
import PortfolioGallery from '@/components/home/PortfolioGallery'
import HowItWorks from '@/components/home/HowItWorks'
import Services from '@/components/home/Services'
import BarberVideoSection from '@/components/home/BarberVideoSection'
import SocialProof from '@/components/home/SocialProof'
import FollowRealCuts from '@/components/home/FollowRealCuts'
import LocationHours from '@/components/home/LocationHours'

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <PortfolioGallery />
      <HowItWorks />
      <Services />
      <BarberVideoSection />
      <SocialProof />
      <FollowRealCuts />
      <LocationHours />
      <Header />
    </>
  )
}
