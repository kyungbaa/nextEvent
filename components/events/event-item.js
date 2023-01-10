import Image from 'next/image';
// 이미지를 최적화 하기 위한 next에 포함된 컴포넌트 표준 이미지 요소 대신 사용
// Image를 사용하면 Next.js에서 여러버전의 이미지를 요청이 들어올때마다 바로바로 생성해줌
// 각 운영체제와 장치크기에 최적화되도록 함 -> 이미지 용량을 줄여줌
// 자동으로 크롬에 최적화된 Webp이미지로 변경됐음

// 모든 기기에 맞춰서 생성하는게 아니라 요청이 있을때마다 생성하며 이미지는 저장해 두었다가 나중에 유사한 기기에서 요청이 들어왔을때 재사용
// .next/cache/image/이름이상한폴더
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import DateIcon from '../icons/date-icon';
import Button from '../ui/button';
import styles from './event-item.module.css';
export default function eventItem(props) {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(',', '\n');
  const exploreLink = `/events/${id}`;
  return (
    <li className={styles.item}>
      <Image src={`/${image}`} alt={title} width={250} height={160} />

      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
