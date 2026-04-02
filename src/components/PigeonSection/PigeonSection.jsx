import styles from './PigeonSection.module.css'
import RobotModel from '../RobotModel/RobotModel'

export default function PigeonSection() {
  return (
    <section className={styles.section}>
      <p className={styles.text}>
        PIGEONS WILL CAN NOT ESCAPE ANYMORE
      </p>
      <div className={styles.robot}>
        <RobotModel />
      </div>
    </section>
  )
}
