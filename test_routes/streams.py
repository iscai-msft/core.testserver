# coding: utf-8
# -------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See LICENSE.txt in the project root for
# license information.
# -------------------------------------------------------------------------
from flask import (
    Response,
    Blueprint,
)

streams_api = Blueprint('streams_api', __name__)

class StreamingBody:
    def __iter__(self):
        yield b"Hello, "
        yield b"world!"


def streaming_body():
    yield b"Hello, "
    yield b"world!"


async def async_streaming_body():
    yield b"Hello, "
    yield b"world!"

@streams_api.route('/basic', methods=['GET'])
def get_basic():
    return Response(streaming_body(), status=200)

@streams_api.route('/iterable', methods=['GET'])
def get_iterable():
    return Response(StreamingBody(), status=200)


# app.get("/streams/jpeg", "GetJpeg", async (req) => {
#   const buffer: Buffer = await fs.promises.readFile(resolve(__dirname, "../../src/test-routes/fox.jpeg"));
#   for (let i = 0; i < buffer.length; i++) {
#     await write(req, buffer.slice(i, i + 1));
#   }
#   return {
#     status: 200,
#   };
# });

# app.get("/streams/text", "GetText", async (req) => {
#   for (let i = 0; i < 10; i++) {
#     await write(req, Buffer.from("Hello, world!\n", "utf-8"));
#   }
#   return {
#     status: 200,
#   };
# });
