import React from "react";
import Card from "../Common/Card";
import Searchbar from "../Common/Searchbar";

export default function Home() {
    const headerContent = (
        <h2 className="home-title">
            Welcome, use the search bar to find media!
        </h2>
    );

    const bodyContent = <Searchbar />;
    return (
        <div className="main home">
            <Card header={headerContent} body={bodyContent} type="home" />
        </div>
    );
}
