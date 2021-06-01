# Writing mock apis

1. Create a new file in the `test_routes` folder if your test case doesn't fall into any of the file categories currently there
    If you create a new file, please follow these steps:
    1. Import `Blueprint` from `flask`, then add `{category}_api = Blueprint('{category}_api', __name__)`, with `{category}` being
    whatever category you're targeting in your file
    2. Expose your file in `test_routes/__init__.py`
    3. Add `app.register_blueprint({category}_api, url_prefix="/{category}")` in the main `app.py` file
2. Define your API in the files! The url of the flask app should be `http://localhost:5000/`, and if your blueprint is registered with a
`url_prefix`, the urls you include for each individual API should be relative to `http://localhost:5000/{category}/`

***See the [Flask docs](https://flask.palletsprojects.com/en/2.0.x/api/) for documentation***

## Example

### Get

```python
@example_api.route('/string', methods=['GET'])
def string():
    return Response(
        "Hello, world!", status=200, mimetype="text/plain"
    )
```

### Post with assertion

```python
@example_api.route('/json', methods=['POST'])
def json():
    json_input_body = request.get_json()
    assert_with_message(
        param_name="json input body",
        expected_value={"Hello": "world!"},
        actual_value=json_input_body,
    )
    return Response(status=200)
```

### Stream response

```python
@example_api.route('/stream', methods=['GET'])
def stream():
    def streaming_body():
        yield b"Hello, "
        yield b"world!"
    return Response(streaming_body(), status=200)
```

## How to validate the request:

There is an `assert_with_message` helper function in test_routes/helpers.py.
It takes three inputs:

1. The name of the parameter whose value you're asserting. You can give whatever value you want for this, this is for clarity in the assertion error message
2. The expected value of the parameter
3. The actual value of the parameter

If assertion fails, you will get an `AssertionError` logged where you are currently hosting the `flask` app.
