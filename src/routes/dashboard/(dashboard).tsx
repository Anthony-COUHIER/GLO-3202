import { Prisma } from "@prisma/client";
import { createSignal, onMount } from "solid-js";
import { Navigate } from "solid-start";
import { Button } from "~/components/Button";
import { ModalCreateTask } from "~/components/ModalCreateTask";
import { useAuth } from "~/context/auth";
import { trpc } from "~/utils/trpc";

export default function dashboard() {
  const [modalOpen, setModalOpen] = createSignal(false);
  const [tasks, setTasks] = createSignal<Prisma.TaskCreateInput[]>([]);
  const [isLoading, setIsLoading] = createSignal(false);
  const { user } = useAuth();
  if (!user()) {
    return <Navigate href="/login" />;
  }

  onMount(async () => {
    setIsLoading(true);
    const tasks = await trpc.task.getTasks.query({});
    setTasks(tasks);
    setIsLoading(false);
  });

  async function test(title: string, isFavorite: boolean, content: string) {}

  const [fav, setFav] = createSignal(false);

  return (
    <>
      <ModalCreateTask
        actionOnSave={test}
        modalOpen={modalOpen()}
        setModalOpen={(b) => setModalOpen(b)}
      />
      <main>
        <h1>Dashboard</h1>

        <div class="max-w-lg m-1">
          <Button onClick={() => setModalOpen(true)}>Create task</Button>
          {/* <ul> */}
          {/* <For each={tasks()}>
            {(task) => (
              <li class="bg-white shadow overflow-hidden sm:rounded-lg">
                {task.title}
              </li>
            )}</For>
        </ul> */}
        </div>
      </main>
    </>
  );
}
