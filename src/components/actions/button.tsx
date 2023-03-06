import type { JSX } from "solid-js";

interface ButtonProps {
  children: JSX.Element;
  class?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      class={`btn ${props.class}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
