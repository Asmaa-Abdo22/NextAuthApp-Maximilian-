import { signIn } from '@/actions/authActions';
import AuthForm from '@/components/auth-form';

export default async function Home() {
  return <AuthForm action={signIn}/>;
}
