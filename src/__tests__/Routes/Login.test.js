import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Login from "../../Routes/Login";
import TestContext from "../../contextForTests";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <TestContext>
                <Login />
            </TestContext>
        </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <TestContext>
                <Login />
            </TestContext>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
