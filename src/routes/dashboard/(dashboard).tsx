import { Prisma } from "@prisma/client";
import { createSignal, For, onMount } from "solid-js";
import { Navigate } from "solid-start";
import toast from "solid-toast";
import { Button } from "~/components/Button";
import { ModalCreateTask } from "~/components/ModalCreateTask";
import TaskRow from "~/components/task/taskRow";
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
    const tasks = await trpc.task.getTasks.query({ userId: user()!!.id });
    setTasks(tasks);
    setIsLoading(false);
  });

  async function manageTask(
    title: string,
    description: string,
    isFavorite: boolean
  ) {
    try {
      const newTask = await trpc.task.createTask.mutate({
        userId: user()!!.id,
        title: title,
        description: description,
        isFavorite: isFavorite,
      });
      setTasks((allTasks) => [...allTasks, newTask]);
    } catch (err) {
      console.error(err);
      toast.error("Error on create new task");
    }
  }

  async function setFavorite(task: Prisma.TaskCreateInput) {
    try {
      const newTask = await trpc.task.updateTask.mutate({
        userId: user()!!.id + "aze",
        id: task.id!!,
        isFavorite: !task.isFavorite,
      });
      setTasks((allTasks) =>
        allTasks.map((t) => (t.id === newTask.id ? newTask : t))
      );
    } catch (err) {
      toast.error("Error while updating task");
    }
  }

  async function deleteTask(task: Prisma.TaskCreateInput) {
    try {
      await trpc.task.deleteTask.mutate({
        userId: user()!!.id,
        id: task.id!!,
      });
      setTasks((allTasks) => allTasks.filter((t) => t.id !== task.id));
    } catch (err) {
      toast.error("Error while deleting task");
    }
  }
  return (
    <>
      <ModalCreateTask
        actionOnSave={manageTask}
        modalOpen={modalOpen()}
        setModalOpen={(b) => setModalOpen(b)}
      />
      <main>
        <div class="flex justify-center">
          <div class="max-w-lg m-1 w-full">
            <Button onClick={() => setModalOpen(true)}>Create task</Button>
            <ul class="flex gap-1 flex-col">
              <For each={tasks()}>
                {(task) => (
                  <li class="">
                    <TaskRow
                      task={task}
                      onToggleFavorite={setFavorite}
                      onDelete={deleteTask}
                    />
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
