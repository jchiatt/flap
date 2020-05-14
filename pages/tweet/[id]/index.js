import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Header from '../../../components/Header';

export default function TweetPage({ title, body }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />
      <h1>Tweet: {id}</h1>
      <h2>Title: {title}</h2>
      <p>{body}</p>
    </>
  );
}

TweetPage.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${query.id}`
  );
  const post = res.json();
  return post;
};
