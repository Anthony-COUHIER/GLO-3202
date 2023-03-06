import { createClient } from "altogic";
import { serverEnv } from "~/env/server";

const altogic = createClient(
  "https://secu-glo3202.c3-na.altogic.com",
  "377f59c2fb7b4239a4b6bb757ff90b3d",
  {
    signInRedirect: "/login",
  }
);

export default altogic;
