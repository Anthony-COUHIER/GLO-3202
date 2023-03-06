import { type VoidComponent } from "solid-js";
import { A, useNavigate } from "solid-start";
import altogic from "~/libs/altogic";

const Home: VoidComponent = () => {
  const user = altogic.auth.getUser();
  const nav = useNavigate();

  if (user) {
    nav("/profile");
  }

  return (
    <main class="flex items-center justify-center gap-4 h-screen">
      <A href="/login" class="border px-4 py-2 font-medium text-xl">
        Login
      </A>
      <A href="/register" class="border px-4 py-2 font-medium text-xl">
        Register
      </A>
    </main>
  );
};

export default Home;
