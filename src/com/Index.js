import React from "react";
import Header from "./parts/Header";
import Body from "./parts/Body";
import Footer from "./parts/Footer";

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
