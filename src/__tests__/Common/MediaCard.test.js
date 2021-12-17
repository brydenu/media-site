import React from "react";
import { render } from "@testing-library/react";
import MediaCard from "../../Common/MediaCard";
import { MemoryRouter } from "react-router";
import TestContext from "../../contextForTests";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <TestContext>
                <MediaCard />
            </TestContext>
        </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <TestContext>
                <MediaCard />
            </TestContext>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
