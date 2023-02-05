import { Navigate } from "solid-start";
import { useAuth } from "~/context/auth";

export default function dashboardPage() {
  const { user } = useAuth();
  if (!user()) {
    return (
      <Navigate href="/login" />
    )
  }
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
