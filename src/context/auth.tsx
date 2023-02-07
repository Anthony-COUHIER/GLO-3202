import { Accessor, createContext, createSignal, JSX, onMount, useContext } from "solid-js";
import { User } from "~/store/user";
import { trpc } from "~/utils/trpc";

interface Context {
  user: Accessor<User | null>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, username: string) => Promise<void>;
}

const AuthContext = createContext<Context>();

interface AuthProviderProps {
  children: JSX.Element
}

export const localStorageUserName = "USER";

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = createSignal<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const u = await trpc.auth.login.query({
        email: email,
        password: password
      });
      const newU: User = {
        id: u.id,
        email: u.email,
        username: u.username,
        createAt: new Date(u.createAt),
        updateAt: new Date(u.updateAt),
      }
      setUser(newU);
      localStorage.setItem(localStorageUserName, JSON.stringify(newU));
    } catch (e) {
      console.log(e);
    }
  }
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem(localStorageUserName);
  }
  const signup = async (email: string, password: string, username: string): Promise<void> => {
    try {
      const u = await trpc.auth.register.mutate({
        email: email,
        password: password,
        username: username,
      });
      const newU: User = {
        id: u.id,
        email: u.email,
        username: u.username,
        createAt: new Date(u.createAt),
        updateAt: new Date(u.updateAt),
      }
      setUser(newU);
      localStorage.setItem(localStorageUserName, JSON.stringify(newU));
    } catch (e) {
      console.log(e);
    }
  }

  onMount(() => {
    const u: string | null = localStorage.getItem(localStorageUserName);
    if (u) {
      setUser(JSON.parse(u));
    }
  });

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }} >
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)!!;
}
