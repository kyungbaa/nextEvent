import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

export default function FilterdEventPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
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
    numMonth > 12
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

  const filterdEvents = getFilteredEvents({ year: numYear, month: numMonth });

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
