import { Prisma } from "@prisma/client";
import { createSignal, For, onMount } from "solid-js";
import { Navigate } from "solid-start";
import { useAuth } from "~/context/auth";
import { trpc } from "~/utils/trpc";

export default function dashboard() {
  const [tasks, setTasks] = createSignal<Prisma.TaskCreateInput[]>([]);
  const [isLoading, setIsLoading] = createSignal(false);
  const { user } = useAuth();
  if (!user()) {
    return (
      <Navigate href="/login" />
    )
  }

  onMount(async () => {
    setIsLoading(true);
    const tasks = await trpc.task.getTasks.query({});
    setTasks(tasks);
    setIsLoading(false);
  });

  return (
    <main>
      <h1>Dashboard</h1>

      <div class="max-w-lg m-1">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const title = e.currentTarget.title.value;
            console.log(title);
            // const task = await trpc.task.createTask.mutation({ title });
            // setTasks([...tasks(), task]);
          }}
        >
          <label class="block">
            <span class="text-gray-700">Title</span>
            <input
              type="text"
              name="title"
              class="form-input mt-1 block w-full"
              placeholder="Task title"
            />
          </label>
          <button
            type="submit"
            class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create task
          </button>
        </form>
      </div>

      <div class="max-w-lg m-1">
        <ul>
          <For each={tasks()}>
            {(task) => (
              <li class="bg-white shadow overflow-hidden sm:rounded-lg">
                {task.title}
              </li>
            )}</For>
        </ul>
      </div>
    </main>
  );
}
