import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

const userStorageName = "USER";

export default userStorageName;

export interface user {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export function createLocalStore<T extends object>(
  name: string,
  init: T
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name);
  const [state, setState] = createStore<T>(
    localState ? JSON.parse(localState) : init
  );
  createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
  return [state, setState];
}

export function getUser(name: string): user | null {
  const localState = localStorage.getItem(name);
  return localState ? JSON.parse(localState) as user : null;
}

export function setUser(name: string, value: user) {
  localStorage.setItem(name, JSON.stringify(value));
}

export function removeUser(name: string) {
  localStorage.removeItem(name);
}

export function isAuthenticated(): boolean {
  return localStorage.getItem("user") ? true : false;
}

export function updateUser(username?: string, email?: string, firstName?: string, lastName?: string) {
  const user = getUser(userStorageName);
  if (user) {
    if (username) user.username = username;
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    setUser(userStorageName, user);
  }
}
