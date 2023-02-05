import { createSessionStorage, redirect } from "solid-start";
import { SessionStorage } from "solid-start/session/sessions";

const userStorageName = "USER";

export default userStorageName;

export interface User {
  id: string;
  email: string;
  username: string;
  createAt: Date;
  updateAt: Date;
}

export const storage: SessionStorage = createSessionStorage({
  cookie: {
    name: "session",
    secure: import.meta.env.PROD,
    secrets: [import.meta.env.VITE_SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    httpOnly: true
  },
  async createData(data, expires) {
    return db.sessions.create({ data: { ...data, expires } })
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

export async function getUserId(request: Request) {
  const session = await storage.getSession(
    request.headers.get('Cookie')
  );

  const userId = session.get('userId');
  return userId;
}

export async function login(request: Request, userId: string) {
  const session = await storage.getSession(
    request.headers.get('Cookie')
  );
  session.set('userId', userId);
  const response = new Response('Logged in', {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  });
}

export async function signUp(request: Request, userId: string): Promise<Response> {
  const session = await storage.getSession();
  session.set("userId", userId);
  return new Response('Signed Up', {
    headers: {
      "Set-Cookie": await storage.commitSession(session)
    }
  });
}

export async function logout(request: Request): Promise<Response> {
  const session = await storage.getSession(
    request.headers.get('Cookie')
  );

  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}
