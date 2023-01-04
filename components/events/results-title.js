import Button from '../ui/button';

function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="mt-8 text-center">
      <h1 className="mb-2 text-lg font-semibold">
        Events in {humanReadableDate}
      </h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
