import { createSignal, Show } from "solid-js";
import { Navigate, useNavigate } from "solid-start";
import { Login } from "~/components/auth/login";
import { SignUp } from "~/components/auth/signup";
import { useAuth } from "~/context/auth";

export interface tabProps {
  navToHomePage: () => void;
}


export default function LoginPage() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = createSignal("login");

  const navToHomePage = () => nav("/");

  if (user()) {
    return (
      <Navigate href="/" />
    )
  }


  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Login
      </h1>
      <div class="max-w-2xl mx-auto">
        <div class="flex justify-center m-1">
          <button class={`px-4 py-2 rounded-l-md ${tab() === "login" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setTab("login")}>Login</button>
          <button class={`px-4 py-2 rounded-r-md ${tab() === "signup" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setTab("signup")}>Sign Up</button>
        </div>
        <div class="bg-white shadow-md rounded-b px-8 pt-6 pb-8 mb-4">
          <Show when={tab() === "login"} fallback={<SignUp navToHomePage={navToHomePage} />}>
            <Login navToHomePage={navToHomePage} />
          </Show>
        </div>
      </div>
    </main>
  );
}
