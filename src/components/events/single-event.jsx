import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
const SingleEvent = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();
  console.log(router);

  //handle onSubmit of the form
  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const eventId = router?.query.id;

    try {
      //Post Request
      const response = await fetch('/api/email-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, eventId }),
      });
    } catch (e) {
      console.log('ERROR', e);
    }
  };
  return (
    <div>
      <Image src={data.image} width={500} height={300} alt={data.title}></Image>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <form onSubmit={onSubmit}>
        <label>Get Registered for this event!</label>
        <input
          ref={inputEmail}
          type="email"
          id="email"
          placeholder="Please insert your email"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SingleEvent;
