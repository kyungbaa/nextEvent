import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../helpers/api-util';
import useSWR from 'swr';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

// 페이지 목적 먼저 생각하기

// getStaticProps vs getServerSideProps
// 사전 생성할 페이지의 필터링 조합을 정하기는 어려움 그리고 조합해야 할 페이지 양도 너무 많아서 사전렌더링은 맞지 않음
// 들어오는 모든 요청에 대해 즉시 데이터를 페칭해서 해당요청에 대한 페이지를 반환 getServerSideProps
// pre-render가 꼭 필요한 동적 데이터가 있는 page에 사용하면 됩니다.
// 매 요청마다 호출되므로 성능은 getStaticProps에 뒤지지만, 내용을 언제든 동적으로 수정이 가능합니다.

// 갑자기 csr데이터 페칭으로 바꾼 이유 1. 이벤트 목록 필터 페이지가 이벤트 리스트 페이지나 이벤트 디테일 페이지보다 전혀 중요하지 않음 2.seo도 필요없음

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function FilterdEventPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    'https://nextevent-5ee4a-default-rtdb.firebaseio.com/events.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log(2);
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading.........</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2000 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error // useSWR 데이터 패칭
  ) {
    return (
      <ErrorAlert>
        <div className="flex flex-col items-center justify-center">
          <p className="mt-3 mb-4 font-bold text-center">
            Invalid filter. Please Check Your Values!
          </p>
          <Button link="/events">Show All Events!</Button>
        </div>
      </ErrorAlert>
    );
  }

  const filterdEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filterdEvents || filterdEvents.length === 0) {
    return (
      <ErrorAlert>
        <div className="flex flex-col items-center justify-center">
          <p className="mt-3 mb-4 font-bold text-center">
            No event found for the chosen filter!
          </p>
          <Button link="/events">Show All Events!</Button>
        </div>
      </ErrorAlert>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filterdEvents} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;
//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2000 ||
//     numMonth < 1 ||
//     numMonth > 12
//   )
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // 만약 에러페이지를 따로 설정해 두었으면 하단처럼 하면 됨.
//       // redirect: {
//       //   destination: '/error',
//       // },
//       // 무튼 알아놓으시고 난 미리 만들어둔 ErrorAlert
//     };

//   const filterdEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filterdEvents,
//       data: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
