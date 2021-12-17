import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Signup from "../../Routes/Signup";
import TestContext from "../../contextForTests";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <TestContext>
                <Signup />
            </TestContext>
        </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <TestContext>
                <Signup />
            </TestContext>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
