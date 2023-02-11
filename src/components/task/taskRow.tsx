import { Prisma } from "@prisma/client";

interface TaskRowProps {
  task: Prisma.TaskCreateInput;
  onDelete: (task: Prisma.TaskCreateInput) => void;
  onToggleFavorite: (task: Prisma.TaskCreateInput) => void;
}

export default function TaskRow(props: TaskRowProps) {
  return (
    <div class="p-5 border border-gray-400 rounded">
      <h3 class="text-lg font-bold">{props.task.title}</h3>
      <p class="text-gray-700">{props.task.content}</p>
      <div class="flex justify-between">
        <button
          onClick={() => props.onDelete(props.task)}
          class="text-red-500 hover:text-red-700"
        >
          Supprimer
        </button>
        <button
          onClick={() => props.onToggleFavorite(props.task)}
          class={`${
            props.task.isFavorite ? "text-yellow-500" : "text-grey-500"
          } hover:text-yellow-700`}
        >
          Favoris
        </button>
      </div>
    </div>
  );
}
