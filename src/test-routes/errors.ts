import { app } from "../api";

app.get("/errors/403", "GetBasic403Error", (req) => {
  return {
    status: 403,
  };
});

app.get("/errors/500", "GetBasic500Error", (req) => {
  return {
    status: 500,
  };
});
