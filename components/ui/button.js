import Link from 'next/link';
import styles from './button.module.css';

export default function Button(props) {
  return (
    // <Link className={styles.btn} href={props.link}>
    //   {props.children}
    // </Link>

    <Link
      className="relative inline-block px-5 py-2 overflow-hidden font-medium text-purple-600 rounded group bg-purple-50"
      href={props.link}
    >
      <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
      <span class="relative group-hover:text-white"> {props.children}</span>
    </Link>
  );
}
