import styles from './ContentSection.module.css'

export default function ContentSection({ id, label }) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.sectionLabel}>{label}</div>
      <div className={styles.card}>
        <div className={styles.nestedBoxes}>
          <span className={styles.cardLabel}>{label}</span>
        </div>
      </div>
    </section>
  )
}
