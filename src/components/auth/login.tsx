import { createSignal } from "solid-js";
import toast from "solid-toast";
import { useAuth } from "~/context/auth";
import { tabProps } from "~/routes/login/(login)";

export function Login(props: tabProps) {
  const { login } = useAuth();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      await login(email(), password());
      props.navToHomePage();
    } catch (err) {
      toast.error("Error while login");
    }
  };

  return (
    <form class="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <label
          class="flex items-start text-gray-700 font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          required
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          id="email"
          value={email()}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        />
      </div>
      <div>
        <label
          class="flex items-start text-gray-700 font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          required
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="password"
          id="password"
          value={password()}
          onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
        />
      </div>
      <div>
        <button
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
}
