import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

export default function Home(props) {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvent = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvent,
    },
    revalidate: 1800, //새로 수신되는 요청에 대해 30분에 한번 페이지 재생성
  };
}
