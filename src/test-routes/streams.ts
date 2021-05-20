import { app } from "../api";
import { resolve } from "path";
import { write } from "../api/stream-response";
import { promisify } from "util";
import fs from "fs";


app.get("/streams/jpeg", "GetJpeg", async (req) => {
  const buffer: Buffer = await fs.promises.readFile(resolve(__dirname, "../../src/test-routes/fox.jpeg"));
  for (let i = 0; i < buffer.length; i++) {
    await write(req, buffer.slice(i, i + 1));
  }
  return {
    status: 200,
  };
});

app.get("/streams/text", "GetText", async (req) => {
  for (let i = 0; i < 10; i++) {
    await write(req, Buffer.from("Hello, world!\n", "utf-8"));
  }
  return {
    status: 200,
  };
});

