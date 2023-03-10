import Link from 'next/link';
import Image from 'next/image';
const CatEvent = ({ data, pageName }) => {
  return (
    <div>
      <h1>Events in {pageName}</h1>
      {data.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`}>
          {/* <a> */}
          <Image width={300} height={300} alt={ev.title} src={ev.image} />
          <h2>{ev.title}</h2>
          <p>{ev.description}</p>
          {/* </a> */}
        </Link>
      ))}
    </div>
  );
};

export default CatEvent;
