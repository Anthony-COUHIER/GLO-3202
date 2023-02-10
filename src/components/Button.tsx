import { JSX } from "solid-js";

interface ButtonProps {
  children: JSX.Element;
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
