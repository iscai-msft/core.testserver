import { app, json } from "../api";

app.get("/basic/helloWorld/string", "GetBasicHelloWorldString", (req) => {
  return {
    status: 200,
    body: {
      contentType: "application/json",
      rawContent: "Hello, world!",
    },
  };
});

app.get("/basic/helloWorld/text", "GetBasicHelloWorldText", (req) => {
  return {
    status: 200,
    body: {
      contentType: "text/plain; charset=utf-8",
      rawContent: "Hello, world!",
    },
  };
});

app.get("/basic/helloWorld/bytes", "GetBasicHelloWorldBytes", (req) => {
  return {
    status: 200,
    body: {
      contentType: "application/json",
      rawContent: Buffer.from("Hello, world!"),
    },
  };
});

app.get("/basic/helloWorld/html", "GetBasicHelloWorldHtml", (req) => {
  return {
    status: 200,
    body: {
      contentType: "text/html",
      rawContent: "<html><body>Hello, world!</html></body>",
    },
  };
});

app.get("/basic/json", "GetJson", (req) => {
  return {
    status: 200,
    body: {
      contentType: "application/json",
      rawContent: {"greeting": "hello", "recipient": "world"},
    },
  };
});
