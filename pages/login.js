import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function LoginPage() {
  const router = useRouter();
  function login(e) {
    e.preventDefault();
    router.push('/dashboard');
  }

  return (
    <>
      <Header />
      <h1>Login</h1>
      <input placeholder="Username" />
      <input placeholder="Password" type="password" />
      <button onClick={login} type="button">
        Log In
      </button>
    </>
  );
}
