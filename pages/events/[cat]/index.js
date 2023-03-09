import Image from 'next/image';

const EventsCatPage = ({ data }) => {
  return (
    <div>
      <h1>Events in London</h1>

      {data.map((ev) => (
        <a key={ev.id} href={`/events/${ev.city}/${ev.id}`}>
          <Image width={300} height={300} alt={ev.title} src={ev.image} />
          <h2>{ev.title}</h2>
          <p>{ev.description}</p>
        </a>
      ))}

      {/* <a href="/events/event1">Event 1</a>
      <a href="/events/event2">Event 2</a>
      <a href="/events/event3">Event 3</a>
      <a href="/events/event4">Event 4</a>
      <a href="/events/event5">Event 5</a> */}
    </div>
  );
};

export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import('/data/data.json');

  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });
  // console.log(allPaths);
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.cat;
  const { allEvents } = await import('/data/data.json');
  const data = allEvents.filter((ev) => ev.city === id);
  // console.log(data);
  return {
    props: {
      data: data,
    },
  };
}
