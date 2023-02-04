import { createContext, JSX, useContext } from "solid-js";
import { createSessionStorage } from "solid-start";

const AuthContext = createContext()

interface AuthProviderProps {
  children: JSX.Element
}

export function authProvider(props: AuthProviderProps) {
  const storage = createSessionStorage({
    cookie: {
      name: "session",
      secure: import.meta.env.PROD,
      secrets: [import.meta.env.VITE_SESSION_SECRET],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true
    },
    async createData(data, expires) {
      return db.sessions.create({ data: { ...data, expires } });
    },
    async updateData(id, data, expires) {
      return db.sessions.update({ where: { id }, data: { ...data, expires } });
    },
    async deleteData(id) {
      return db.sessions.delete({ where: { id } });
    },
    async readData(id) {
      return db.sessions.findUnique({ where: { id } });
    }
  });

  return (
    <AuthContext.Provider value={storage}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
