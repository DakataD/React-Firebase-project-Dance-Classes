import React, { createContext, useState } from "react";

const BackgroundContext = createContext(null);

function BackgroundProvider({ children }) {
  const [backgroundImage, setBackgroundImage] = useState(null);

  return (
    <BackgroundContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export { BackgroundProvider, BackgroundContext };
