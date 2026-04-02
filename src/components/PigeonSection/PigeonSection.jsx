import styles from './PigeonSection.module.css'
import RobotModel from '../RobotModel/RobotModel'

export default function PigeonSection() {
  return (
    <section className={styles.section}>
      <div className={styles.textBlock}>
        <p className={styles.line}>
          <span className={styles.filled}>PIGEONS</span>
        </p>
        <p className={styles.line}>
          <span className={styles.dim}>WILL CAN NOT</span>
        </p>
        <p className={styles.line}>
          <span className={styles.targetBox}>
            <span className={styles.escape}>ESCAPE</span>
            <span className={styles.bracketTL} />
            <span className={styles.bracketTR} />
            <span className={styles.bracketBL} />
            <span className={styles.bracketBR} />
          </span>
        </p>
        <p className={styles.line}>
          <span className={styles.outline}>ANYMORE</span>
        </p>
      </div>

      {/* Laser beam from text toward robot */}
      <div className={styles.laser}>
        <div className={styles.laserCore} />
      </div>

      <div className={styles.robot}>
        <div className={styles.robotRing} />
        <RobotModel />
      </div>
    </section>
  )
}
