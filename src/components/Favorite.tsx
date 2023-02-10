import { mergeProps, Show } from "solid-js";

interface FavoriteProps {
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
  disabled?: boolean;
}

export function Favorite(props: FavoriteProps) {
  const mergedProps = mergeProps({ disable: false }, props);

  function setFavorite() {
    mergedProps.setIsFavorite(!mergedProps.isFavorite);
  }

  return (
    <button
      class={`${
        mergedProps.isFavorite ? "text-yellow-700" : "text-gray-500"
      } h-5 w-5 hover:text-yellow-200 focus:outline-none focus:text-yellow-500 transition duration-150 ease-in-out`}
      onClick={setFavorite}
      disabled={mergedProps.disabled}
    >
      <Show
        when={mergedProps.isFavorite}
        fallback={<img src="/svg/grey_star.svg" alt="set as favorite" />}
      >
        <img src="/svg/yellow_star.svg" alt="set as favorite" />
      </Show>
    </button>
  );
}
