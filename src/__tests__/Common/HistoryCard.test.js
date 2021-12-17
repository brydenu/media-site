import React from "react";
import { render } from "@testing-library/react";
import HistoryCard from "../../Common/HistoryCard";
import { MemoryRouter } from "react-router";
import TestContext from "../../contextForTests";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <TestContext>
                <HistoryCard />
            </TestContext>
        </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <TestContext>
                <HistoryCard />
            </TestContext>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
