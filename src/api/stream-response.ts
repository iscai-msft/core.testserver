import { MockRequest } from "../api/mock-request";

export function sendFile(req: MockRequest, filename: string) {
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

export function write(req: MockRequest, chunk: any) {
  return new Promise<void>((resolve, reject) => {
    req.originalRequest.res?.write(chunk, (error: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
