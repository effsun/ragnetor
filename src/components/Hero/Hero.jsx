import styles from './Hero.module.css'

const WORDS = ['TAKE', 'YOUR', 'SPACE', 'BACK']

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <h1 className={styles.headline}>
        {WORDS.map((word, i) => (
          <span
            key={word}
            className={styles.word}
            style={{ animationDelay: `${0.2 + i * 0.25}s` }}
          >
            {word}
          </span>
        ))}
      </h1>
    </section>
  )
}
