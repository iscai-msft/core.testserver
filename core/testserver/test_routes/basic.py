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

basic_api = Blueprint('basic_api', __name__)

@basic_api.route('/string', methods=['GET'])
def string():
    return Response(
        "Hello, world!", status=200, mimetype="text/plain"
    )

@basic_api.route('/lines', methods=['GET'])
def lines():
    return Response(
        "Hello,\nworld!", status=200, mimetype="text/plain"
    )

@basic_api.route("text", methods=['GET'])
def charset():
    return Response(
        "Hello, world!", status=200, mimetype="text/plain"
    )

@basic_api.route("/bytes", methods=['GET'])
def bytes():
    return Response(
        "Hello, world!".encode(), status=200, mimetype="text/plain"
    )

@basic_api.route("/html", methods=['GET'])
def html():
    return Response(
        "<html><body>Hello, world!</html></body>", status=200, mimetype="text/html"
    )

@basic_api.route("/json", methods=['GET'])
def json():
    return Response(
        '{"greeting": "hello", "recipient": "world"}', status=200, mimetype="application/json"
    )
