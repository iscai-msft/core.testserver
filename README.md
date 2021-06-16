# Core Test Server

## Requirements

- Python.

## Getting started

1. Create a new virtual environment
2. Install the dependencies in your virtual enviroment
    ```bash
    pip install -r requirements.txt
    ```
3. Run the server

    a. Run it in normal mode: set the environment variable `FLASK_APP` to `coretestserver`

    b. Run it in debug mode: If you're in VSCode, you can click the debug button, click "Run and Debug", then select "Flask" from the drop down menu, then set
    the "path to application" as `coretestserver`.

## Writing mock apis

See [docs](./docs/writing-mock-apis.md)
