import { app } from "../api";
import { write } from "../api/stream-response";

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

app.get("/errors/stream", "GetStreamedError", async (req) => {
  const str = "Hello, world!\n";
  for (let i = 0; i < 10; i++) {
    await write(req, Buffer.from(str.charAt(i), "utf-8"));
  }
  return {
    status: 500,
  };
});
