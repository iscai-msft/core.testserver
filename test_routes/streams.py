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
def basic():
    return Response(streaming_body(), status=200)

@streams_api.route('/iterable', methods=['GET'])
def iterable():
    return Response(StreamingBody(), status=200)
