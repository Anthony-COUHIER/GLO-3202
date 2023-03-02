import { createServerData$ } from "solid-start/server";
import { getSession } from "@auth/solid-start";
import { authOpts } from "./api/auth/[...solidauth]";
import Header from "~/components/navigation/header";
import { Suspense, VoidComponent } from "solid-js";
import { signOut, signIn } from "@auth/solid-start/client";

export default function Home() {
  const sessionData = createSession();
  return (
    <main>
      <Header user={sessionData()?.user} />
      <section class="flex flex-col items-center justify-center gap-4">
        <Suspense>
          <AuthShowcase />
        </Suspense>
      </section>
    </main>
  );
}

const AuthShowcase: VoidComponent = () => {
  const sessionData = createSession();
  return (
    <div class="flex flex-col items-center justify-center gap-4">
      <p class="text-center text-2xl text-white">
        {sessionData() && <span>Logged in as {sessionData()?.user?.name}</span>}
      </p>
      <button
        class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={
          sessionData() ? () => void signOut() : () => void signIn("google")
        }
      >
        {sessionData() ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

const createSession = () => {
  return createServerData$(async (_, event) => {
    return await getSession(event.request, authOpts);
  });
};
