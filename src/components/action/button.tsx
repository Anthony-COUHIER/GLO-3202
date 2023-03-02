import { JSX } from "solid-js";

interface ButtonProps {
  onClick?: (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => void;
  children?: JSX.Element;
  type?: "submit" | "reset" | "button";
  class?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      class={`btn ${props.class}`}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
