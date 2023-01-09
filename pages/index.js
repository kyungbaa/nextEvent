import Head from 'next/head';
// 자동으로 <head>섹샨에 nextJs가 추가해준다.

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>NextJs Event - Next.Js 연습</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
        {/* meta태그는 해당문서의 대한 정보인 메타 데이터를 정의할 떄 사용  */}
      </Head>
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
