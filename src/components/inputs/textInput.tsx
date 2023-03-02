import { createSignal, mergeProps, Show } from "solid-js";

interface TextInputProps {
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  onInput?: (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => void;
}

export default function TextInput(props: TextInputProps) {
  const mergedProps = mergeProps(
    {
      placeholder: "",
      type: "text",
    },
    props
  );

  return (
    <div class="form-control w-full max-w-xs">
      <Show when={mergedProps.label}>
        <label class="label">
          <span class="label-text">{mergedProps.label}</span>
        </label>
      </Show>
      <input
        name={mergedProps.name}
        type={mergedProps.type}
        placeholder={mergedProps.placeholder}
        onInput={(e) => {
          if (mergedProps.onInput) mergedProps.onInput(e);
        }}
        class="input input-bordered w-full max-w-xs"
      />
    </div>
  );
}
