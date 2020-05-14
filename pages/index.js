import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../firebase/useAuth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  max-width: 660px;
  min-height: 280px;
  width: 100%;
  border: 16px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
  padding: 2rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default function HomePage() {
  const auth = useAuth();
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  async function getTweet(e) {
    e.preventDefault();
    const tweetId = url.split('/')[5]; // don't actually use this, dude
    const tweetData = await fetch('/api/tweet/get', {
      body: JSON.stringify({
        tweetId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    setData(await tweetData.json());
  }

  const signIn = () => {
    auth
      .signin()
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Card>
        <h2>Track a Tweet</h2>
        <input
          type="text"
          placeholder="Paste a Tweet URL..."
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button type="button" onClick={getTweet}>
          Track
        </button>
        <button onClick={signIn} type="button">
          Sign in
        </button>
        {data && <pre>Your tweet: {data?.tweet?.text}</pre>}
      </Card>
    </Container>
  );
}
