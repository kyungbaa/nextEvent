import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

// 이벤트에 대한 모든 세부사항을 갖고 있는 단일 페이지임
// 전체 리스트페이지보다 중요함 -> 크롤링 되도록 처음부터 데이터를 가지고 있어야한다.
// getStaticProps 이런 페이지는 늘 변경되는 사용자 특정 데이터를 필요로하는 페이지가 아님 -> 그래서 사전생성 사용

// 동적 페이지니까 따로 관리 필요함 getStaticPaths()

export default function EventDetailPage(props) {
  const event = props.selectedEvent;
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        data={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

// 애는 context 있어야함  -> 이벤트 데이트를 로딩할 특정 eventId를 알아야해서
export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  // 이 id가 파일 이름에 인코딩한 식별자임

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30, //이벤트의 상세 내용은 중요하니까 조금 더 짧게 30초가 지나면 생성
  };
}

export async function getStaticPaths() {
  // 만약에 이게 실제 페이지라면 엄청 많은 이벤트가 표시되는데 다 사전렌더링하는건 낭비
  // 주요이벤트만 렌더링하기
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: true,
    // fallback: 'blocking' 페이지가 생성될 때까지 Next.js는 아무것도 하지 않는다. 처음부터 완료된 페이지만 볼 수 있음
  };
}
