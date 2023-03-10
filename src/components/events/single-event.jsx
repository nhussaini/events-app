import Image from 'next/image';
const SingleEvent = ({ data }) => {
  const onSubmit = () => {};
  return (
    <div>
      <Image src={data.image} width={500} height={300} alt={data.title}></Image>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <form onSubmit={onSubmit}>
        <label>Get Registered for this event!</label>
        <input type="email" id="email" placeholder="Please insert your email" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SingleEvent;
