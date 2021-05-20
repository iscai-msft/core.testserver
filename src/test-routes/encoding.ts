import { app } from "../api";
import { encode } from "iconv-lite";

app.get("/encoding/latin-1", "GetEncodingLatin1String", (req) => {
  return {
    status: 200,
    body: {
      contentType: "text/plain; charset=latin-1",
      rawContent: encode("Latin 1: ÿ", "latin-1"),
    },
  };
});

app.get("/encoding/latin-1-string-with-utf-8", "GetEncodingLatin1StringWithUtf8", (req) => {
  return {
    status: 200,
    body: {
      contentType: "text/plain; charset=utf-8",
      rawContent: encode("Latin 1: ÿ", "latin-1"),
    },
  };
});

app.get("/encoding/no-charset", "GetEncodingNoCharset", (req) => {
  return {
    status: 200,
    body: {
      contentType: "text/plain",
      rawContent: "Hello, world!",
    },
  };
});

app.get("/encoding/iso-8859-1", "GetIso88591", (req) => {
  return {
    status: 200,
    body: {
      contentType: "text/plain",
      rawContent: "Accented: Österreich",
    },
  };
});

app.get("/encoding/emoji", "GetEncodingEmoji", (req) => {
  return {
    status: 200,
    body: {
      contentType: "text/plain",
      rawContent: "👩",
    },
  };
});

app.get("/encoding/emoji-family-skin-tone-modifier", "GetEncodingEmojiFamilySkinToneModifier", (req) => {
  return {
    status: 200,
    body: {
      contentType: "text/plain",
      rawContent: "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
    },
  };
});

app.get("/encoding/korean", "GetEncodingKorean", (req) => {
  return {
    status: 200,
    body: {
      contentType: "text/plain",
      rawContent: "아가",
    },
  };
});

app.get("/encoding/json", "GetEncodingJson", (req) => {
  return {
    status: 200,
    body: {
      contentType: "application/json; charset=utf-16",
      rawContent: encode(JSON.stringify({ greeting: "hello", recipient: "world" }), "utf-16"),
    },
  };
});
