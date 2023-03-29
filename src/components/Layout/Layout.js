import React, { useContext } from "react";
import { BackgroundContext } from "./../../contexts/BackgroundContext";

function Layout({ children }) {
  const { backgroundImage } = useContext(BackgroundContext);

  const style = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh"
  };

  return <div style={style}>{children}</div>;
}

export default Layout;