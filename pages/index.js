import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';
export default function Home() {
  const featuredEvent = getFeaturedEvents();
  return (
    <div className="flex items-center">
      <EventList items={featuredEvent} />
    </div>
  );
}
