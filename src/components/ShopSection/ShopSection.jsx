import styles from './ShopSection.module.css'

export default function ShopSection() {
  return (
    <section id="shop" className={styles.section}>
      <div className={styles.watermark}>RAGNETOR</div>
      <div className={styles.content}>
        <p>COMING SOON</p>
        <p>GEAR · MERCH · MORE</p>
      </div>
    </section>
  )
}
