# -------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See LICENSE.txt in the project root for
# license information.
# -------------------------------------------------------------------------
def assert_with_message(param_name, expected_value, actual_value):
    assert expected_value == actual_value, f"Expected '{param_name}' to be '{expected_value}', got '{actual_value}'"
