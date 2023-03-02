import { signIn } from "@auth/solid-start/client";
import { createSignal, Show } from "solid-js";
import { useNavigate } from "solid-start";
import Button from "~/components/action/button";
import TextInput from "~/components/inputs/textInput";
import { clientEnv } from "~/env/client";

export default function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const nav = useNavigate();

  const submit = async () => {
    const res = await signIn("credentials", {
      email: email(),
      password: password(),
      callbackUrl: clientEnv.AUTH_URL,
    });
    console.log("login: ", res);
    nav("/");
  };

  return (
    <main class="grid place-items-center h-screen ">
      <div class="bg-neutral p-4 flex flex-col gap-3 rounded-xl">
        <h1 class="flex justify-center text-2xl">Login</h1>
        <Show when={error()}>
          <p class=" text-red-500">{error()}</p>
        </Show>
        <TextInput
          label="Email"
          placeholder="john@email.com"
          type="email"
          onInput={(e) => setEmail((e.target as HTMLFormElement).value)}
        />
        <TextInput
          label="Password"
          placeholder="********"
          type="password"
          onInput={(e) => setPassword((e.target as HTMLFormElement).value)}
        />
        <Button class="bg-primary mt-6" onClick={submit}>
          Login
        </Button>
      </div>
    </main>
  );
}
