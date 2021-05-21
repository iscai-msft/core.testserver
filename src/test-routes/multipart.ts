import { app } from "../api";
let Busboy = require("busboy");

app.post("/multipart/basic", "PostMultipartBasic", (request) => {
  const busboy = new Busboy({ headers: request.headers });
  console.log(request.headers["Content-Type"])
  console.log(request.originalRequest.body);

  // request.expect.bodyEquals(body_elements.join(''));
  // [^\\r]*
  // request.expect.bodyEquals(
  //   {
  //     [1]   '--1dacb61570b42f34469b1541ca2ebd39\r\nContent-Disposition: form-data; name': '"message"\r\n' +
  //     [1]     '\r\n' +
  //     [1]     'Hello, world!\r\n' +
  //     [1]     '--1dacb61570b42f34469b1541ca2ebd39\r\n' +
  //     [1]     'Content-Disposition: form-data; name="myfile"\r\n' +
  //     [1]     'Content-Type: application/octet-stream\r\n' +
  //     [1]     '\r\n' +
  //     [1]     '<file content>\r\n' +
  //     [1]     '--1dacb61570b42f34469b1541ca2ebd39--\r\n'
  //     [1] }
  // );

  busboy.on("field", function (fieldname: string, val: any) {
    if (fieldname === "fileContent") {
      request.originalRequest.res?.send(val);
    }
  });
  busboy.on("file", function (name: string, stream: any, filename: string, encoding: string, contentType: string) {
    if (contentType !== "application/octet-stream") {
      throw new ValidationError(`Content type should be application/octet-stream, not ${contentType}`, undefined, request.params);
    }
    if (name !== "myfile") {
      throw new ValidationError(`File should be named myfile, not ${name}`, undefined, request.params);
    }
    stream.pipe(request.originalRequest.res);
  });
  busboy.on("finish", function () {
    request.originalRequest.res?.send();
  });

  request.originalRequest.pipe(busboy);
});

app.post("/multipart/data-and-files", "PostMultipartDataAndFiles", (request) => {
  const busboy = new Busboy({ headers: request.headers });
  const body = JSON.stringify(request.body).replace(/(?<=\-\-)(.*?)(?=\\r)/, "");
  console.log(request.body);
  const expectedBody = [
    "{\"",
    "\\r\\n",
    'Content-Disposition: form-data; name: '"message"'\r\n',
    "\\r\\n",
    "Hello, world!\\r\\n",
    "\\r\\n",
    'Content-Disposition: form-data; name="file"; filename="upload"\\r\\n',
    "Content-Type: application/octet-stream\r\n",
    "\\r\\n",
    "<file content>\\r\\n",
    "--\\r\\n",
    "\"}"
  ].join("");
  if (body !== expectedBody) {
    throw new ValidationError(`Bodys don't match`, expectedBody, body);
  }
  busboy.on("field", function (name: string, val: any) {
    console.log("Field [" + name + "]: value: " + val);
    if (name === "fileContent") {
      request.originalRequest.res?.send(val);
    }
  });
  busboy.on("file", function (name: string, stream: any, filename: string, encoding: string, contentType: string) {
    if (contentType !== "application/octet-stream") {
      throw new ValidationError(`Content type should be application/octet-stream, not ${contentType}`, undefined, request.params);
    }
    if (name !== "myfile") {
      throw new ValidationError(`File should be named myfile, not ${name}`, undefined, request.params);
    }
    stream.pipe(request.originalRequest.res);
  });
  busboy.on("finish", function () {
    request.originalRequest.res?.send();
  });

  request.originalRequest.pipe(busboy);
});
