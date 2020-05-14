import fetch from 'isomorphic-unfetch';
import Header from '../components/Header';

export default function DashboardPage({ name, bio }) {
  return (
    <>
      <Header />
      <h1>{name}</h1>
      <p>{bio}</p>
    </>
  );
}

DashboardPage.getInitialProps = async () => {
  const res = await fetch('https://api.github.com/users/jchiatt');
  const user = res.json();
  return user;
};
