import React from "react";
import { render } from "@testing-library/react";
import Form from "../../Common/Form";
import { MemoryRouter } from "react-router";
import TestContext from "../../contextForTests";

const formFields = [
    {
        label: "Username",
        type: "text",
        fieldName: "username",
        required: true,
    },
    {
        label: "Password",
        type: "password",
        fieldName: "password",
        required: true,
    },
];

it("renders empty", function () {
    render(
        <MemoryRouter>
            <TestContext>
                <Form />
            </TestContext>
        </MemoryRouter>
    );
});

it("renders with testInputs", function () {
    render(
        <MemoryRouter>
            <TestContext>
                <Form fields={formFields} />
            </TestContext>
        </MemoryRouter>
    );
});

it("matches snapshot empty", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <Form />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot with test fields", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <Form fields={formFields} />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
