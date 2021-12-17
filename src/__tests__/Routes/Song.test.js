import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Song from "../../Routes/Song";
import TestContext from "../../contextForTests";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <TestContext>
                <Song />
            </TestContext>
        </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <TestContext>
                <Song />
            </TestContext>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
