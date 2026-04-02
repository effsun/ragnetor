import styles from './Navbar.module.css'
import PigeonSVG from '../svg/PigeonSVG'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <a href="#hero" className={styles.logo}>
        <PigeonSVG />
        RAGNETOR
      </a>
      <ul className={styles.links}>
        <li><a href="#stream">STREAM</a></li>
        <li><a href="#game">GAME</a></li>
        <li><a href="#shop">SHOP</a></li>
        <li><a href="#contacts">CONTACTS</a></li>
      </ul>
    </nav>
  )
}
