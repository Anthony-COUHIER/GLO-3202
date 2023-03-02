import { signIn } from "@auth/solid-start/client";
import { createSignal, Show } from "solid-js";
import { useNavigate } from "solid-start";
import toast from "solid-toast";
import Button from "~/components/action/button";
import TextInput from "~/components/inputs/textInput";
import { trpc } from "~/utils/trpc";

export default function Register() {
  const [email, setEmail] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const mutate = trpc.authRouter.register.useMutation();
  const nav = useNavigate();

  const submit = async () => {
    try {
      if (password() !== confirmPassword()) {
        setError("Passwords do not match");
        return;
      }
      console.log("email:", email());
      console.log("username:", username());
      console.log("password:", password());
      await mutate.mutateAsync({
        email: email(),
        username: username(),
        password: password(),
      });
      await signIn("credentials", {
        email: email(),
        password: password(),
      });
      nav("/");
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <main class="grid place-items-center h-screen ">
      <div class="bg-neutral p-4 flex flex-col gap-3 rounded-xl">
        <h1 class="flex justify-center text-2xl">Register</h1>
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
          label="Username"
          placeholder="john"
          type="text"
          onInput={(e) => setUsername((e.target as HTMLFormElement).value)}
        />
        <TextInput
          label="Password"
          placeholder="********"
          type="password"
          onInput={(e) => setPassword((e.target as HTMLFormElement).value)}
        />
        <TextInput
          label="Confirm Password"
          placeholder="********"
          type="password"
          onInput={(e) =>
            setConfirmPassword((e.target as HTMLFormElement).value)
          }
        />
        <Button class="bg-primary mt-6" onClick={submit}>
          Register
        </Button>
      </div>
    </main>
  );
}
