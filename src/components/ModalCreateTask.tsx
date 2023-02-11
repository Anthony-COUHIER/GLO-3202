import { createSignal, mergeProps } from "solid-js";
import toast from "solid-toast";
import { Favorite } from "./Favorite";

interface ModalCreateTaskProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  actionOnSave: (
    title: string,
    description: string,
    isFavorite: boolean
  ) => Promise<void>;
  title?: string;
  isFavorite?: boolean;
  content?: string;
}

export const ModalCreateTask = (props: ModalCreateTaskProps) => {
  const mergedProps = mergeProps(
    { title: "", isFavorite: false, content: "" },
    props
  );
  const [fav, setFav] = createSignal(false);

  async function submit(e: HTMLFormElement) {
    e.preventDefault();
    const title = e.currentTarget.title.value;
    const description = e.currentTarget.description.value;

    if (!title || !description) {
      toast.error("Title and description are required");
      return;
    }
    await mergedProps.actionOnSave(title, description, fav());
    mergedProps.setModalOpen(false);
  }

  return (
    <div
      class={`fixed top-0 left-0 right-0 bottom-0 z-50 ${
        mergedProps.modalOpen ? "flex" : "hidden"
      }`}
    >
      <div
        class="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-25 z-40"
        onClick={() => mergedProps.setModalOpen(false)}
      ></div>
      <div class="bg-white m-auto p-6 max-w-sm rounded-lg shadow-xl z-50">
        <div class="flex flex-row w-full justify-between">
          <h3 class="text-lg font-medium mb-4">Create task</h3>
          <Favorite isFavorite={fav()} setIsFavorite={(f) => setFav(f)} />
        </div>
        <form onSubmit={submit}>
          <div class="mb-4">
            <label class="block">
              <span class="text-gray-700">Title</span>
              <input
                type="text"
                name="title"
                class="form-input mt-1 block w-full"
                placeholder="Task title"
              />
            </label>
          </div>
          <div class="mb-4">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <textarea
                name="description"
                rows="4"
                class="form-textarea mt-1 block w-full"
                placeholder="Task description"
              ></textarea>
            </label>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              class="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
              onClick={() => mergedProps.setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
