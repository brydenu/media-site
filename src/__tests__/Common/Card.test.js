import React from "react";
import { render } from "@testing-library/react";
import Card from "../../Common/Card";

it("renders without any props", function () {
    render(<Card />);
});

it("renders with some", function () {
    render(<Card header={<h1>Test Header</h1>} body={<p>Test Body</p>} />);
});

it("renders with all inputs", function () {
    render(
        <Card
            header={<h1>Test Header</h1>}
            body={<p>Test Body</p>}
            cardClass="test-card"
            headerClass="test-header-class"
        />
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <Card
            header={<h1>Test Header</h1>}
            body={<p>Test Body</p>}
            cardClass="test-card"
            headerClass="test-header-class"
        />
    );
    expect(asFragment()).toMatchSnapshot();
});
