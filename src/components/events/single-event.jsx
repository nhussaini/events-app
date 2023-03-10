import Image from 'next/image';
const SingleEvent = ({ data }) => {
  return (
    <div>
      <Image src={data.image} width={500} height={300} alt={data.title}></Image>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default SingleEvent;
