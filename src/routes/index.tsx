import { useNavigate } from "solid-start";
import { useAuth } from "~/context/auth";

export default function Home() {
  const { user } = useAuth();
  const nav = useNavigate();

  if (!user()) {
    nav("/login");
  } else {
    nav("/dashboard");
  }
}
