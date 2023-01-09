import { useRouter } from 'next/router';
import Head from 'next/head';

import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';

export default function AllEventPage(props) {
  const router = useRouter();
  const { events } = props;

  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    // event 다음으로 무제한으로 세그먼트가 소비된다. 만약에 세그먼트가 하나라면 슬러그 페이지가 트리거되지 않는데 이유는 [eventId].js에 구체적인 라우트가 존재하기 떄문 세그먼트가 하나라면 eventId페이지 이상이라면 slug페이지로 이동
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Event - Next.Js 연습</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
