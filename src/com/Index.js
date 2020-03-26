import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

let drawerWidth = 250;

const Index = () => {
  return (
    <div>
      <Header drawerWidth={drawerWidth} />
      <Body drawerWidth={drawerWidth} />
      <Footer drawerWidth={drawerWidth} />
    </div>
  );
};

export default Index;
