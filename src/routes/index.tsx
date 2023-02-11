import { Navigate } from "solid-start";
import { useAuth } from "~/context/auth";

export default function Home() {
  const { user } = useAuth();

  <Navigate href="/dashboard" />;
}
