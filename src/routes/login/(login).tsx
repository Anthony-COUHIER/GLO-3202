import { createSignal, Show } from "solid-js";
import { Navigate, useNavigate } from "solid-start";
import { useAuth } from "~/context/auth";

interface tabProps {
  navToHomePage: () => void;
}

function LoginComponent(props: tabProps) {
  const { login } = useAuth();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    try {
      login(email(), password())
      props.navToHomePage();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form class="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <label class="flex items-start text-gray-700 font-bold mb-2" for="email">Email</label>
        <input required class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" id="email" value={email()} onInput={e => setEmail((e.target as HTMLInputElement).value)} />
      </div>
      <div>
        <label class="flex items-start text-gray-700 font-bold mb-2" for="password">Password</label>
        <input required class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" id="password" value={password()} onInput={e => setPassword((e.target as HTMLInputElement).value)} />
      </div>
      <div>
        <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
      </div>
    </form>
  )
}

function SignupComponent(props: tabProps) {
  const { signup } = useAuth();
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    try {
      signup(email(), password(), username());
      props.navToHomePage();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form class="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <label class="flex items-start text-gray-700 font-bold" for="email">Email</label>
        <input required class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="email" id="email" value={email()} onInput={e => setEmail((e.target as HTMLInputElement).value)} />
      </div>
      <div>
        <label class="flex items-start text-gray-700 font-bold" for="username">Username</label>
        <input required class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" id="username" value={username()} onInput={e => setUsername((e.target as HTMLInputElement).value)} />
      </div>
      <div>
        <label class="flex items-start text-gray-700 font-bold" for="password">Password</label>
        <input required class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" id="password" value={password()} onInput={e => setPassword((e.target as HTMLInputElement).value)} />
      </div>
      <div>
        <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
      </div>
    </form>
  )
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
          <Show when={tab() === "login"} fallback={<SignupComponent navToHomePage={navToHomePage} />}>
            <LoginComponent navToHomePage={navToHomePage} />
          </Show>
        </div>
      </div>
    </main>
  );
}
