import { A, useNavigate } from "@solidjs/router";
import { batch, createEffect, createSignal, For, Show } from "solid-js";
import altogic from "../libs/altogic";
import { useAuth } from "../context/AuthContext";
import TextInput from "~/components/data/TextInput";
import Button from "~/components/actions/button";
import { trpc } from "~/utils/trpc";

export default function Register() {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [passwordConfirmation, setPasswordConfirmation] = createSignal("");
  const [errors, setErrors] = createSignal(null);
  const [error, setError] = createSignal<null | string>(null);
  const [loading, setLoading] = createSignal(false);
  const [needToVerify, setNeedToVerify] = createSignal(false);
  const [passwordStrenght, setPasswordStrenght] = createSignal(0);
  const [_, { setUser, setSession }] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = trpc.auth.isValidEmail.useQuery(() => ({ email: email() }));

    if (res.data === false) {
      setError("email");
      return;
    }
    if (passwordStrenght() < 5) {
      setError("password");
      return;
    }
    setErrors(null);
    setLoading(true);
    const {
      errors: apiErrors,
      user,
      session,
    } = await altogic.auth.signUpWithEmail(email(), password(), name());
    setLoading(false);

    if (apiErrors) {
      return setErrors(apiErrors);
    }

    if (!session) {
      setNeedToVerify(true);
      batch(() => {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
      });
      return;
    }

    setUser(user);
    setSession(session);
    navigate("/profile");
  };

  createEffect(() => {
    const res = trpc.auth.validatePassword.useQuery(() => ({
      password: password(),
    }));

    if (res.data) setPasswordStrenght(res.data);

    if (res.data) setError("password)");
  });

  return (
    <section class="grid content-center justify-center h-screen gap-4">
      <form
        onSubmit={handleSubmit}
        class="flex flex-col gap-2 w-full md:w-96 bg-slate-700 p-4 rounded-xl"
      >
        <h1 class="self-start text-3xl font-bold">Create an account</h1>
        {needToVerify() && (
          <div class="bg-green-500 text-white p-2">
            Your account has been created. Please check your email to verify
            your account.
          </div>
        )}
        {errors() && (
          <div class="bg-red-600 text-white text-[13px] p-2">
            <For each={errors().items}>{(error) => <p>{error.message}</p>}</For>
          </div>
        )}
        <TextInput
          value={name()}
          onInput={(e) => setName(e.target.value)}
          autocomplete="given-name"
          type="text"
          placeholder="Type your name"
          required
        />
        <TextInput
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
          autocomplete="email"
          type="email"
          placeholder="Type your email"
          required
        />
        <Show when={error()?.includes("email")}>
          <div class="bg-accent-focus p-2 rounded-md">
            <p>Invalid email</p>
          </div>
        </Show>
        <TextInput
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
          type="password"
          autocomplete="new-password"
          placeholder="Type your password"
          required
        />
        <div class="h-1 w-full bg-accent-focus rounded-full">
          <div
            class={`h-full w-${passwordStrenght()}/5 ${
              passwordStrenght() == 0 ? "hidden" : ""
            } bg-accent rounded-full transition-all`}
          />
        </div>
        <TextInput
          value={passwordConfirmation()}
          onInput={(e) => setPasswordConfirmation(e.target.value)}
          type="password"
          autocomplete="new-password"
          placeholder="Confirm your password"
          required
        />
        <Show when={error()?.includes("password")}>
          <div class="bg-accent-focus p-2 rounded-md">
            <p>You have to use at least:</p>
            <p>* 8 characters</p>
            <p>* One digit</p>
            <p>* One special characters</p>
            <p>* One uppercase</p>
            <p>* One lowercase</p>
          </div>
        </Show>
        <div class="flex justify-between gap-4 items-center">
          <A class="text-indigo-600" href="/login">
            Already have an account?
          </A>
          <Button
            disabled={loading()}
            type="submit"
            class="border py-2 px-3 border-gray-500 hover:bg-gray-500 hover:text-white transition shrink-0"
          >
            Create account
          </Button>
        </div>
      </form>
    </section>
  );
}
