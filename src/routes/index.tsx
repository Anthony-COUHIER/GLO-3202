import { Navigate } from "solid-start";
import { useAuth } from "~/context/auth";

export default function Home() {
  const { user } = useAuth()!!;

  return (
    <Navigate href={user() ? "/dashboard" : "/login"} />
  );
}
