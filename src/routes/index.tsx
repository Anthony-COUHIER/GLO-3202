import { Navigate } from "solid-start";
import { useAuth } from "~/context/auth";

export default function Home() {
  const { user } = useAuth();

  if (!user()) {
    <Navigate href="/login" />;
  } else {
    <Navigate href="/dashboard" />;
  }
}
