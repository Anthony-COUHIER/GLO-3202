import { mergeProps, Show } from "solid-js";

interface TextInputProps {
  value: string;
  onInput?: (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  class?: string;
  label?: string;
  autocomplete?: string;
}

export default function TextInput(props: TextInputProps) {
  const mergedProps = mergeProps(
    {
      type: "text",
      placeholder: "",
      required: false,
      disabled: false,
      name: "",
      class: "",
    },
    props
  );

  const onInput = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => {
    if (mergedProps.onInput) {
      mergedProps.onInput(e);
    }
  };

  return (
    <div class="form-control">
      <Show when={mergedProps.label}>
        <label for={mergedProps.name}>
          <span class="label-text">{mergedProps.label}</span>
        </label>
      </Show>
      <input
        autocomplete={mergedProps.autocomplete}
        value={mergedProps.value}
        class={`input ${mergedProps.class}`}
        onInput={onInput}
        type={mergedProps.type}
        placeholder={mergedProps.placeholder}
        required={mergedProps.required}
        disabled={mergedProps.disabled}
        name={mergedProps.name}
      />
    </div>
  );
}
