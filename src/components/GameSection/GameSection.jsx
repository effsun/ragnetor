import { useEffect, useRef, useState } from 'react'
import styles from './GameSection.module.css'
import PigeonHunt from './PigeonHunt'

export default function GameSection() {
  const sectionRef = useRef(null)
  const [btnVisible, setBtnVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [animatePreview, setAnimatePreview] = useState(false)

  function handleClose() {
    setIsClosing(true)
  }

  function onAnimationEnd() {
    if (isClosing) {
      setIsOpen(false)
      setIsClosing(false)
      setAnimatePreview(true)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBtnVisible(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="game" ref={sectionRef} className={styles.section}>
      <div className={styles.sectionLabel}>GAME</div>

      {isOpen ? (
        <div
          className={`${styles.gameWrap} ${isClosing ? styles.closing : styles.opening}`}
          onAnimationEnd={onAnimationEnd}
        >
          <button className={styles.closeBtn} onClick={handleClose}>
            ✕ CLOSE
          </button>
          <PigeonHunt />
        </div>
      ) : (
        <div
          className={`${styles.preview} ${animatePreview ? styles.previewEnter : ''}`}
          onAnimationEnd={() => setAnimatePreview(false)}
        >
          <button
            className={`${styles.btn} ${btnVisible ? styles.btnVisible : ''}`}
            onClick={() => setIsOpen(true)}
          >
            PLAY NOW
          </button>
        </div>
      )}
    </section>
  )
}
