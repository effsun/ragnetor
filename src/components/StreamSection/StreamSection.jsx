import { useEffect, useRef, useState } from 'react'
import styles from './StreamSection.module.css'

const CHANNEL = 'effsunjuice'

export default function StreamSection() {
  const sectionRef = useRef(null)
  const embedContainerRef = useRef(null)
  const [isLive, setIsLive] = useState(true)
  const [progress, setProgress] = useState(0)

  // Load Twitch embed and listen for live status
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://embed.twitch.tv/embed/v1.js'
    script.async = true

    script.onload = () => {
      if (!embedContainerRef.current) return

      const embed = new window.Twitch.Embed(embedContainerRef.current, {
        width: '100%',
        height: '100%',
        channel: CHANNEL,
        layout: 'video',
        autoplay: true,
        muted: true,
        parent: [window.location.hostname],
      })

      embed.addEventListener(window.Twitch.Embed.VIDEO_READY, () => {
        const player = embed.getPlayer()
        player.addEventListener(window.Twitch.Player.ONLINE, () => setIsLive(true))
        player.addEventListener(window.Twitch.Player.OFFLINE, () => setIsLive(false))
      })
    }

    document.head.appendChild(script)
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script)
    }
  }, [])

  // Scroll-driven scale: small rect → full 16:9
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when section top is at viewport bottom, 1 when section top is at viewport top
      const p = Math.max(0, Math.min(1, (vh - rect.top) / vh))
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!isLive) return null

  // Interpolate width: 18% → 100%, with 16:9 maintained via padding-bottom
  const widthPct = 18 + progress * 82

  return (
    <section id="stream" ref={sectionRef} className={styles.section}>
      <div className={styles.sectionLabel}>
        <span className={styles.dot} />
        STREAM
      </div>

      <div className={styles.playerArea}>
        <div className={styles.playerWrap} style={{ width: `${widthPct}%` }}>
          <div className={styles.aspectBox}>
            <div ref={embedContainerRef} className={styles.embedInner} />
          </div>
        </div>
      </div>
    </section>
  )
}
