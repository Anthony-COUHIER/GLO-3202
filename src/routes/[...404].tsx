import { useNavigate } from "solid-start";

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Not Found
      </h1>
      <button onClick={goBack}>Get back</button>
    </main>
  );
}
