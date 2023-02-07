import { Prisma } from "@prisma/client";

interface TaskRowProps {
  task: Prisma.TaskCreateInput;
}

export default function TaskRow(props: TaskRowProps) {
  return (
    <div>
      <h1>{props.task.title}</h1>
      <p>{props.task.content}</p>
    </div>
  )
}
