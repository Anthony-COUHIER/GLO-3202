import { A, useNavigate } from "@solidjs/router";
import { batch, createSignal, For, Show } from "solid-js";
import altogic from "../libs/altogic";
import { useAuth } from "../context/AuthContext";
import TextInput from "~/components/data/TextInput";
import Button from "~/components/actions/button";

export default function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [errors, setErrors] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();
  const [_, { setUser, setSession }] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    const {
      session,
      errors: apiErrors,
      user,
    } = await altogic.auth.signInWithEmail(email(), password());
    setLoading(false);

    if (apiErrors) {
      return setErrors(apiErrors);
    }

    batch(() => {
      setEmail("");
      setPassword("");
      setUser(user);
      setSession(session);
    });

    navigate("/profile");
  };

  return (
    <section class="flex flex-col items-center justify-center h-96 gap-4">
      <form
        onSubmit={handleSubmit}
        class="flex flex-col gap-2 w-full md:w-96 bg-slate-700 p-4 rounded-xl"
      >
        <h1 class="self-start text-3xl font-bold">Login to your account</h1>

        <Show when={errors()}>
          <div class="bg-red-600 text-white text-[13px] p-2">
            <For each={errors().items}>{(error) => <p>{error.message}</p>}</For>
          </div>
        </Show>

        <TextInput
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          type="email"
          placeholder="Type your email"
          required
        />
        <TextInput
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
          type="password"
          placeholder="Type your password"
          required
        />
        <div class="flex justify-between gap-4 items-center">
          <A class="text-indigo-600" href="/register">
            Don't have an account?
          </A>
          <Button
            disabled={loading()}
            type="submit"
            class="border py-2 px-3 border-gray-500 hover:bg-gray-500 hover:text-white transition shrink-0"
          >
            Login
          </Button>
        </div>
      </form>
    </section>
  );
}
