import { Show } from "solid-js";
import { useNavigate } from "solid-start";
import { useAuth } from "~/context/auth";

export function Header() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <header class="flex justify-between bg-purple-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">GLO-3202</span>
      </div>
      <div>
        <Show when={user()}>
          <button onClick={handleLogout} class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple-500 hover:bg-white" >Logout</button>
        </Show>
      </div>
    </header >
  )
}
