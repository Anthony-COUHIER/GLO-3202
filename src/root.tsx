// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title, useLocation
} from "solid-start";
import Header from "./components/Header";
import { AuthProvider } from "./context/auth";
import "./root.css";

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <Html lang="en">
      <Head>
        <Title>GLO-3202</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <AuthProvider>
            <ErrorBoundary>
              <Header />
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </AuthProvider>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}