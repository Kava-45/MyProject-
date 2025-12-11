import React from "react";
import Header_searcher from "./Mycomponents/header_searcher";
import Body_container from "./Mycomponents/body_container";
import Adversement from "./Mycomponents/advertisement";
import "./App.css";

const Main_pages = () => {
  return (
    <>
      <Header_searcher />
      <Body_container />
      <Adversement />
    </>
  );
};

export default Main_pages;
