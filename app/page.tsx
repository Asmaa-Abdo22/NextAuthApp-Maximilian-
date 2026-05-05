import { auth } from "@/actions/authActions";
import AuthForm from "@/components/auth-form";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode = "login" } = await searchParams;
  return <AuthForm action={auth.bind(null, mode)} currentMode={mode} />;
}
