import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import PigeonSection from './components/PigeonSection/PigeonSection'
import GameSection from './components/GameSection/GameSection'
import StreamSection from './components/StreamSection/StreamSection'
import ShopSection from './components/ShopSection/ShopSection'
import CTASection from './components/CTASection/CTASection'
import ContactSection from './components/ContactSection/ContactSection'

export default function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        <Hero />
        <PigeonSection />
        <StreamSection />
        <GameSection />
        <ShopSection />
        <CTASection />
        <ContactSection />
      </main>
    </div>
  )
}
