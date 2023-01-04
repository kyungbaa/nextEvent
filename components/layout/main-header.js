import Link from 'next/link';
import styles from './main-header.module.css';
export default function MainHeader(props) {
  return (
    <haeader className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Next Events</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/events"></Link>
          </li>
        </ul>
      </nav>
    </haeader>
  );
}
