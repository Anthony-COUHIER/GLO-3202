import { createSignal } from "solid-js";
import { useAuth } from "~/context/auth";
import { tabProps } from "~/routes/login";

export function SignUp(props: tabProps) {
  const { signup } = useAuth();
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      await signup(email(), password(), username());
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
