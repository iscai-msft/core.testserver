import { app } from "../api";
import { resolve } from "path";
import { MockRequest } from "../api/mock-request";

function sendFile(req: MockRequest, filename: string) {
  return new Promise<void>((resolve, reject) => {
    req.originalRequest.res?.sendFile(filename, (error: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

app.get("/streams/get-jpeg", "GetJpeg", async (req) => {
  await sendFile(req, resolve(__dirname, "../../src/test-routes/fox.jpeg"));
  return {
    status: 200,
  };
});
